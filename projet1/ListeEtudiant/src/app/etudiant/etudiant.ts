import { Component } from '@angular/core';
import { Student } from './TypeStudent';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [UpperCasePipe, FormsModule],    
  templateUrl: './etudiant.html',
  styleUrls: ['./etudiant.css'],            
})
export class EtudiantComponent {
  etudiant: Student = {
    id: 1,
    name:'',
    lastname: 'Ben Saleh',
    average: 18
  };
}



