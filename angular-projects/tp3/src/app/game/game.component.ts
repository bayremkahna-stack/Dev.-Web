import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question } from './question.model';
import { ScoreComponent } from '../score/score.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule, ScoreComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  // Tableau de questions
  questions: Question[] = [
    {
      id: 1,
      question: 'Quel est le plus grand océan du monde ?',
      options: ['Pacifique', 'Atlantique', 'Indien', 'Arctique'],
      reponse: 'Pacifique',
      repondu: false
    },
    {
      id: 2,
      question: 'Quelle est la capitale de l\'Algérie ?',
      options: ['Alger', 'Tunis', 'Tanger', 'Casablanca'],
      reponse: 'Alger',
      repondu: false
    },
    {
      id: 3,
      question: 'Quelle est la couleur du ciel ?',
      options: ['Bleu', 'Vert', 'Rouge', 'Jaune'],
      reponse: 'Bleu',
      repondu: false
    },
    {
      id: 4,
      question: 'Combien font 5 + 7 ?',
      options: ['10', '11', '12', '13'],
      reponse: '12',
      repondu: false
    },
    {
      id: 5,
      question: 'Quel est le langage de programmation utilisé dans ce projet ?',
      options: ['Java', 'Python', 'TypeScript', 'C++'],
      reponse: 'TypeScript',
      repondu: false
    }
  ];

  // Variables de scoring
  score: number = 0;
  bonnesReponses: number = 0;
  mauvaisesReponses: number = 0;

  // Variables pour le chronomètre (Défi 3)
  tempsRestant: number = 30;
  chronoInterval: any;
  jeuTermine: boolean = false;

  // Index de la question actuelle
  questionActuelle: number = 0;

  // Réponse saisie par l'utilisateur (pour two-way binding)
  reponseSaisie: string = '';

  ngOnInit(): void {
    this.demarrerChrono();
  }

  ngOnDestroy(): void {
    this.arreterChrono();
  }

  // Défi 3: Chronomètre pour chaque question
  demarrerChrono(): void {
    this.tempsRestant = 30;
    this.chronoInterval = setInterval(() => {
      if (this.tempsRestant > 0) {
        this.tempsRestant--;
      } else {
        // Temps écoulé, passer à la question suivante
        this.questionSuivante();
      }
    }, 1000);
  }

  arreterChrono(): void {
    if (this.chronoInterval) {
      clearInterval(this.chronoInterval);
    }
  }

  // Gestion de la sélection d'option (Event Binding)
  onSelectOption(option: string, question: Question): void {
    // Défi 1: Bloquer les réponses après sélection
    if (question.repondu) {
      return;
    }

    question.repondu = true;
    question.reponseChoisie = option;

    // Mise à jour du score
    if (option === question.reponse) {
      this.score += 10;
      this.bonnesReponses++; // Défi 2
    } else {
      this.score -= 5;
      this.mauvaisesReponses++; // Défi 2
    }

    // Arrêter le chrono et attendre avant de passer à la question suivante
    this.arreterChrono();
    setTimeout(() => {
      this.questionSuivante();
    }, 1500);
  }

  // Two-Way Data Binding pour réponse directe
  validerReponseSaisie(question: Question): void {
    if (question.repondu) {
      return;
    }

    this.onSelectOption(this.reponseSaisie, question);
    this.reponseSaisie = '';
  }

  // Passer à la question suivante
  questionSuivante(): void {
    if (this.questionActuelle < this.questions.length - 1) {
      this.questionActuelle++;
      this.demarrerChrono();
      this.reponseSaisie = '';
    } else {
      this.terminerJeu();
    }
  }

  // Terminer le jeu
  terminerJeu(): void {
    this.jeuTermine = true;
    this.arreterChrono();
  }

  // Recommencer le jeu
  recommencer(): void {
    this.score = 0;
    this.bonnesReponses = 0;
    this.mauvaisesReponses = 0;
    this.questionActuelle = 0;
    this.jeuTermine = false;
    this.reponseSaisie = '';
    
    // Réinitialiser toutes les questions
    this.questions.forEach(q => {
      q.repondu = false;
      q.reponseChoisie = undefined;
    });

    this.demarrerChrono();
  }

  // Obtenir la question actuelle
  getCurrentQuestion(): Question {
    return this.questions[this.questionActuelle];
  }

  // Vérifier si une option est correcte (pour l'affichage après réponse)
  isCorrectOption(option: string, question: Question): boolean {
    return option === question.reponse && !!question.repondu;
  }

  // Vérifier si une option est incorrecte et a été choisie
  isWrongOption(option: string, question: Question): boolean {
    return option === question.reponseChoisie && option !== question.reponse && !!question.repondu;
  }
}
