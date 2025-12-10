import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  @Input() books: Book[] = [];
  @Output() bookDeleted = new EventEmitter<number>();
  @Output() bookEdited = new EventEmitter<Book>();

  // Champ de recherche
  searchTerm = signal<string>('');
  
  // Critères de tri
  sortBy = signal<string>('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Livres filtrés et triés
  get filteredBooks(): Book[] {
    let filtered = this.books;

    // Filtrage par recherche
    const search = this.searchTerm().toLowerCase();
    if (search) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search) ||
        book.category.toLowerCase().includes(search)
      );
    }

    // Tri
    const sortBy = this.sortBy();
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any = a[sortBy as keyof Book];
        let bValue: any = b[sortBy as keyof Book];

        // Conversion pour la comparaison
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
        }
        if (typeof bValue === 'string') {
          bValue = bValue.toLowerCase();
        }

        let result = 0;
        if (aValue < bValue) result = -1;
        else if (aValue > bValue) result = 1;

        return this.sortDirection() === 'desc' ? -result : result;
      });
    }

    return filtered;
  }

  deleteBook(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      this.bookDeleted.emit(id);
    }
  }

  editBook(book: Book) {
    this.bookEdited.emit(book);
  }

  onSearchChange(term: string) {
    this.searchTerm.set(term);
  }

  onSortChange(sortBy: string) {
    if (this.sortBy() === sortBy) {
      // Inverser la direction si on clique sur la même colonne
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(sortBy);
      this.sortDirection.set('asc');
    }
  }
}
