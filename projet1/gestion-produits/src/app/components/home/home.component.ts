import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Jeu de Quiz Interactif';
  description = 'Testez vos connaissances et accumulez des points !';
  
  startQuiz(): void {
    // Logic to start the quiz will be implemented later
    console.log('Démarrage du quiz...');
  }
}
