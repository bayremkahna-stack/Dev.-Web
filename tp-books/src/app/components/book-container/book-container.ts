import { Component, signal } from '@angular/core';
import { Book } from '../../models/book';
import { BookForm } from '../book-form/book-form';
import { BookList } from '../book-list/book-list';

@Component({
  selector: 'app-book-container',
  imports: [BookForm, BookList],
  templateUrl: './book-container.html',
  styleUrl: './book-container.css',
})
export class BookContainer {
  // Liste initiale de livres
  books = signal<Book[]>([
    {
      id: 1,
      title: "Angular pour les débutants",
      author: "Jean Dupont",
      publisherEmail: "jean@publisher.com",
      publisherPhone: "20123456",
      releaseDate: "2023-01-15",
      category: "Informatique",
      isAvailable: true,
      stock: 25
    },
    {
      id: 2,
      title: "Histoire de France",
      author: "Marie Martin", 
      publisherEmail: "marie@histoire.fr",
      publisherPhone: "25987654",
      releaseDate: "2022-06-10",
      category: "Histoire",
      isAvailable: false,
      stock: 0
    },
    {
      id: 3,
      title: "Les Mystères de l'Univers",
      author: "Paul Durand",
      publisherEmail: "paul@science.org",
      publisherPhone: "23456789",
      releaseDate: "2023-03-22",
      category: "Science",
      isAvailable: true,
      stock: 15
    }
  ]);

  // Tableau des catégories
  categories = signal<string[]>([
    'Roman',
    'Science', 
    'Histoire',
    'Informatique',
    'Art',
    'Autres'
  ]);

  // Livre en cours d'édition
  bookToEdit = signal<Book | null>(null);
  
  // Compteur pour générer les IDs
  private nextId = signal<number>(4);

  // Ajouter un nouveau livre
  addBook(book: Omit<Book, 'id'>) {
    const newBook: Book = {
      ...book,
      id: this.nextId()
    };
    
    this.books.update(books => [...books, newBook]);
    this.nextId.update(id => id + 1);
  }

  // Mettre à jour un livre existant
  updateBook(updatedBook: Book) {
    this.books.update(books => 
      books.map(book => book.id === updatedBook.id ? updatedBook : book)
    );
    this.bookToEdit.set(null);
  }

  // Supprimer un livre
  deleteBook(id: number) {
    this.books.update(books => books.filter(book => book.id !== id));
  }

  // Préparer l'édition d'un livre
  editBook(book: Book) {
    this.bookToEdit.set({ ...book });
  }

  // Annuler l'édition
  cancelEdit() {
    this.bookToEdit.set(null);
  }
}
