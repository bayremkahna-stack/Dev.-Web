import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Utilisateur } from "./utilisateur/utilisateur";
import { ProfilComponent } from './profil/profil';
import { AdresseComponent } from "./composants/adresse/adresse";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Utilisateur, ProfilComponent, AdresseComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  protected readonly title = signal('TP2');
}