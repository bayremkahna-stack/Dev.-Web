import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from './TypeStudent';

@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  etudiant: Student = {
    id: 1,
    name: 'Ali Ben Saleh',
    lastname: 'Ben Ahmed',
    classe: 'L2DSI',
    average: 15.75
  };

  // Propriétés pour la démonstration des pipes
  dateAujourdhui = new Date();
  prixProduit = 1234.56;
  pourcentageReussite = 0.8575;

  constructor() { }

  ngOnInit(): void {
  }
}
