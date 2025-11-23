import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EtudiantComponent } from "./etudiant/etudiant";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EtudiantComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'My class will be Angular Heroes';
  Myname='Bayrem Kahna'
}
