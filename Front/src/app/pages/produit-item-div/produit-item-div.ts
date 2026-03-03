import { Component, Input } from '@angular/core';
import { Produit } from '../../models/produit.model';
import { PRODUITS } from '../../data/produit.data';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-produit-item-div',
  imports: [RouterLink],
  templateUrl: './produit-item-div.html',
  styleUrl: './produit-item-div.scss',
})
export class ProduitItemDiv {
deleteproduit() {
throw new Error('Method not implemented.');
}

  @Input()
  produit: Produit | undefined;


  // produit: Produit = PRODUITS[0];

}
