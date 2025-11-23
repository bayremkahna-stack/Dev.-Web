import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit',
  imports: [CommonModule],
  templateUrl: './produit.html',
  styleUrl: './produit.css',
})
export class ProduitComponent {
  @Input() nomProduit: string = 'Produit Par Défaut';
  @Input() imageUrl: string = 'assets/images/voit1.jpg';
  @Input() prix: number = 45000;
  @Output() produitAjoute = new EventEmitter<string>();
  
  enStock: boolean = true;

  afficherAlerte(): void {
    alert('Produit ajouté au panier');
    this.produitAjoute.emit(`${this.nomProduit} ajouté au panier`);
  }

  toggleStock(): void {
    this.enStock = !this.enStock;
  }
}