import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Utilisateur } from "./utilisateur/utilisateur";
import { ProfilComponent } from './profil/profil';
import { AdresseComponent } from "./composants/adresse/adresse";
import { EtudiantComponent } from './etudiant/etudiant.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Utilisateur, ProfilComponent, AdresseComponent, EtudiantComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  protected readonly title = signal('MyClass Will be Angular Heroes');
}