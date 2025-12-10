import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './utilisateur.html',
  styleUrl: './utilisateur.css'
})
export class UtilisateurComponent {
  nom: string = '';
}
