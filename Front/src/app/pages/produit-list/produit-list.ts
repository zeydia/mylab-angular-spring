import { Component, OnInit, signal, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProduitService } from '../../services/produit-service.service';
import { ProduitItemDiv } from '../produit-item-div/produit-item-div';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ProduitItemDiv],
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss'
})
export class ProduitList implements OnInit {
  public produitService = inject(ProduitService);
  private authService = inject(AuthService);
  
  loading = signal(true);

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user && user.id) {
      // On charge uniquement les produits de l'utilisateur connecté
      this.produitService.getByUser(user.id).subscribe({
        next: () => this.loading.set(false),
        error: () => this.loading.set(false)
      });
    }
  }
}