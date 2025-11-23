import { Component } from '@angular/core';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.html',
  styleUrl: './bienvenue.css'
})
export class BienvenueComponent {
  message: string = 'Bienvenue sur notre site !';
}

