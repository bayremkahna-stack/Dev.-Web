import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class PanierComponent {
  @Input() nombreProduits: number = 0;
  @Input() messages: string[] = [];
}