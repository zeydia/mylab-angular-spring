import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProduitService } from '../../services/produit-service.service';
import { AuthService } from '../../services/auth.service';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-produit-add',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './produit-add.html',
  styleUrl: './produit-add.scss'
})
export class ProduitAdd {
  private produitService = inject(ProduitService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Initialisation avec des valeurs par défaut
  produit: Partial<Produit> = {
    name: '',
    price: 0,
    quantity: 0,
    // category: '',
    description: ''
  };

  saveproduct() {
    const currentUser = this.authService.currentUserValue;
    
    if (currentUser?.id) {
      const payload = { ...this.produit, ownerId: currentUser.id } as Produit;
      
      this.produitService.add(payload).subscribe({
        next: () => this.router.navigate(['/produit-list']),
        error: (err) => console.error("Erreur lors de l'ajout", err)
      });
    }
  }
}