import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProduitService } from '../../services/produit-service.service';
import { Produit } from '../../models/produit.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './produit-detail.html',
  styleUrl: './produit-detail.scss'
})
export class ProduitDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private produitService = inject(ProduitService);

  // Signal pour stocker le produit à afficher
  produit = signal<Produit | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.loadProduit(id);
    }
  }

  loadProduit(id: number) {
    // On tente d'abord de récupérer via le Signal du service (rapide)
    const cachedProduct = this.produitService.getProductById(id)();
    
    if (cachedProduct) {
      this.produit.set(cachedProduct);
    } else {
      // Sinon, on appelle l'API (utile en cas de rafraîchissement de page)
    const productSignal = this.produitService.getProductById(id);
    const productData = productSignal();

    if (productData) {
      this.produit.set({ ...productData });
      
    }
    }
  }

  deleteproduct() {
    const p = this.produit();
    if (p && p.id && confirm(`Voulez-vous vraiment supprimer ${p.name} ?`)) {
      this.produitService.delete(p.id).subscribe({
        next: () => this.router.navigate(['/produit-list']),
        error: (err) => console.error("Erreur de suppression", err)
      });
    }
  }
}