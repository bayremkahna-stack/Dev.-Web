import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  @Input() score: number = 0;
  @Input() bonnesReponses: number = 0;
  @Input() mauvaisesReponses: number = 0;
  @Input() tempsRestant: number = 30;

  // Getter pour la couleur du chronomètre selon le temps restant
  get chronoCouleur(): string {
    if (this.tempsRestant > 20) return '#4caf50';
    if (this.tempsRestant > 10) return '#ff9800';
    return '#f44336';
  }
}
