import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BienvenueComponent } from './bienvenue/bienvenue';
import { ProduitComponent } from './produit/produit';
import { PanierComponent } from './panier/panier';
import { UtilisateurComponent } from './utilisateur/utilisateur';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BienvenueComponent, ProduitComponent, PanierComponent, UtilisateurComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Gestion des Produits';
  nombreProduitsAjoutes = 0;
  messagesPanier: string[] = [];

  produits = [
    { nom: 'BMW Série 3', image: 'assets/images/voit1.jpg', prix: 45000 },
    { nom: 'Mercedes Classe C', image: 'assets/images/voit2.jpg', prix: 52000 },
    { nom: 'Audi A4', image: 'assets/images/voit3.jpg', prix: 48000 }
  ];

  gererAjoutAuPanier(message: string): void {
    this.nombreProduitsAjoutes++;
    this.messagesPanier.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    
    // Garder seulement les 5 derniers messages
    if (this.messagesPanier.length > 5) {
      this.messagesPanier = this.messagesPanier.slice(0, 5);
    }
  }
}
