import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produit } from '../../models/produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit-service.service';

@Component({
  selector: 'app-produit-item-div',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './produit-item-div.html',
  styleUrl: './produit-item-div.scss'
})
export class ProduitItemDiv {
  @Input() produit?: Produit;
  
  private produitService = inject(ProduitService);

  deleteproduit() {
    if (this.produit?.id && confirm(`Supprimer le produit "${this.produit.name}" ?`)) {
      this.produitService.delete(this.produit.id).subscribe({
        next: () => {
          confirm('Produit supprimé avec succès');
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }
}