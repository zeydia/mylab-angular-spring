import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../env/env.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const savedUser = localStorage.getItem('selectedUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: any): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/login`, credentials).pipe(
      tap(user => this.setSession(user))
    );
  }

  register(userData: any): Observable<User> {

    console.log(userData);
    return this.http.post<User>(`${this.API_URL}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('selectedUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setSession(user: User): void {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}