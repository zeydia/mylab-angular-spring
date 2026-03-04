import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../env/env.dev';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  private _users = signal<User[]>([]);
  public users = this._users.asReadonly();

  private _selectedUserProfile = signal<User | null>(null);
  public selectedUserProfile = this._selectedUserProfile.asReadonly();

  constructor(private http: HttpClient) {}

  loadAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL).pipe(
      tap((users) => this._users.set(users))
    );
  }

  getUserProfile(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`).pipe(
      tap((user) => this._selectedUserProfile.set(user))
    );
  }

  updateProfile(id: number, userData: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${id}`, userData).pipe(
      tap((updatedUser) => {
        this._selectedUserProfile.set(updatedUser);
        this._users.update((users) =>
          users.map((u) => (u.id === id ? updatedUser : u))
        );
      })
    );
  }

  updatePassword(id: number, passwords: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/password`, passwords);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        this._users.update((users) => users.filter((u) => u.id !== id));
        if (this._selectedUserProfile()?.id === id) {
          this._selectedUserProfile.set(null);
        }
      })
    );
  }
}