import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  question: string;
  options: string[];
  reponse: string;
  answered?: boolean;
  selectedOption?: string;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  questions: Question[] = [
    {
      question: 'Quel est le plus grand océan du monde ?',
      options: ['Pacifique', 'Atlantique', 'Indien', 'Arctique'],
      reponse: 'Pacifique'
    },
    {
      question: 'Quelle est la capitale de l\'Algérie ?',
      options: ['Alger', 'Tunis', 'Tanger'],
      reponse: 'Alger'
    },
    {
      question: 'Quelle est la couleur du ciel ?',
      options: ['Bleu', 'Vert', 'Rouge'],
      reponse: 'Bleu'
    }
  ];

  currentQuestionIndex = 0;
  score = 0;
  bonnesReponses = 0;
  mauvaisesReponses = 0;
  gameFinished = false;
  reponseTexte = '';
  timeLeft = 30;
  timer: any;

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.timeLeft = 30;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        this.onSelectOption('', this.currentQuestion);
      }
    }, 1000);
  }

  onSelectOption(option: string, question: Question): void {
    if (question.answered) return;

    clearInterval(this.timer);
    question.answered = true;
    question.selectedOption = option;

    if (option === question.reponse) {
      this.score += 10;
      this.bonnesReponses++;
    } else {
      this.score -= 5;
      this.mauvaisesReponses++;
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  }

  onSubmitText(): void {
    if (this.currentQuestion.answered) return;
    this.onSelectOption(this.reponseTexte, this.currentQuestion);
    this.reponseTexte = '';
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.startTimer();
    } else {
      this.gameFinished = true;
      clearInterval(this.timer);
    }
  }

  restartGame(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.bonnesReponses = 0;
    this.mauvaisesReponses = 0;
    this.gameFinished = false;
    this.reponseTexte = '';
    
    this.questions.forEach(q => {
      q.answered = false;
      q.selectedOption = undefined;
    });
    
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
