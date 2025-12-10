import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Output() demarrerQuiz = new EventEmitter<void>();

  commencerJeu(): void {
    this.demarrerQuiz.emit();
  }
}
