import { computed, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Produit } from '../models/produit.model';
import { environment } from '../env/env.dev';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private readonly API_URL = `${environment.apiUrl}/produits`;

  private _products = signal<Produit[]>([]);
  public products = this._products.asReadonly();

  

  constructor(private http: HttpClient) {}

  getByUser(userId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API_URL}/user/${userId}`).pipe(
      tap((data) => this._products.set(data))
    );
  }

  getProductById(id: number): Signal<Produit | undefined> {
    return computed(() => this._products().find((p) => p.id === id));
  }

  add(produit: Produit): Observable<Produit | null> {
    console.log(produit);
    return this.http.post<Produit>(this.API_URL, produit).pipe(
      tap((newProduct) => this._products.update((products) => [...products, newProduct])),
    )
  }

  update(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.API_URL}/${id}`, produit).pipe(
      tap((updatedProduct) =>
        this._products.update((prev) =>
          prev.map((p) => (p.id === id ? updatedProduct : p))
        )
      )
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() =>
        this._products.update((prev) => prev.filter((p) => p.id !== id))
      )
    );
  }

}