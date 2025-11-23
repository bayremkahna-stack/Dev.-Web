import { Component } from '@angular/core';
import { Etudiant } from '../etudiant';
@Component({
selector: 'app-etudiant-form',
templateUrl: './etudiant-form.html',
styleUrls: ['./etudiant-form.css']
})
export class EtudiantFormComponent {
classes = ['L2DSI1', 'L2DSI2',
'L2DSI3', 'L3DSI1','L3DSI2'];
model = new Etudiant(18, 'Mohamed', this.classes[0], 'XYZ');
submitted = false;
onSubmit() { this.submitted = true; }

 get diagnostic() {
    return JSON.stringify(this.model);
  }

  newEtudiant() {
    this.model = new Etudiant(42, '', this.classes[0]);
  }

}