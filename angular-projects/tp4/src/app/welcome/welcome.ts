import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
  isLoggedIn: boolean = false;
  username: string = '';
  requiredName: string = 'Mohamed';

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  login() {
    if (this.username.trim().toLowerCase() === this.requiredName.toLowerCase()) {
      this.isLoggedIn = true;
      this.username = '';
    } else {
      alert(`Erreur: Veuillez entrer "${this.requiredName}" pour vous connecter.`);
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
  }
}
