import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit.model';
import { ProduitService } from '../../services/produit-service.service';
import { ProduitItemDiv } from '../produit-item-div/produit-item-div';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-produit-list',
  imports: [ProduitItemDiv, RouterLink],
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss',
})
export class ProduitList implements OnInit{
  
  produits: Produit[] = [];
  loading = false;
  errorMessage = "";


  constructor(private produitService: ProduitService) {  }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(){
    this.loading = true;
    this.produitService.getAll().subscribe({
      next:(data: Produit[]) => {
        this.produits = data;
      },
      error:(err:any) => {
        this.errorMessage = `Voici une erreur: ${err}`;
        this.loading = false;
      },
      complete:() => {
        this.loading = false;
      }
    });
  }

  logout() {

  }


}
