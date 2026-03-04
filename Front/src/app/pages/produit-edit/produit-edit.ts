import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Produit } from '../../models/produit.model';
import { ProduitService } from '../../services/produit-service.service';

@Component({
  selector: 'app-produit-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './produit-edit.html',
  styleUrl: './produit-edit.scss',
})
export class ProduitEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private produitService = inject(ProduitService);

  // Signal pour gérer le produit en cours d'édition
  produit = signal<Produit | null>(null);
  idProduit!: number;

  ngOnInit(): void {
    // Récupération de l'ID dans l'URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idProduit = +idParam;
      this.loadProduit();
    }
  }

  loadProduit() {
    const productSignal = this.produitService.getProductById(this.idProduit);
    const productData = productSignal();

    if (productData) {
      this.produit.set({ ...productData });
      
    }
  }

  saveproduct() {
    const data = this.produit();
    if (data) {
      this.produitService.update(this.idProduit, data).subscribe({
        next: () => {
          this.router.navigate(['/produit-list']);
        },
        error: (err) => console.error('Erreur lors de la mise à jour', err),
      });
    }
  }
}
