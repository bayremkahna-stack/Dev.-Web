import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookContainer } from './components/book-container/book-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tp-books');
}
