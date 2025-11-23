import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm implements OnChanges {
  @Input() categories: string[] = [];
  @Input() bookToEdit: Book | null = null;
  @Output() bookAdded = new EventEmitter<Omit<Book, 'id'>>();
  @Output() bookUpdated = new EventEmitter<Book>();
  @Output() editCancelled = new EventEmitter<void>();

  @ViewChild('bookForm') bookForm!: NgForm;

  // Modèle du formulaire
  formData = {
    title: '',
    author: '',
    publisherEmail: '',
    publisherPhone: '',
    releaseDate: '',
    category: '',
    isAvailable: true,
    stock: 0
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookToEdit'] && this.bookToEdit) {
      // Précharger le formulaire avec les données du livre à éditer
      this.formData = {
        title: this.bookToEdit.title,
        author: this.bookToEdit.author,
        publisherEmail: this.bookToEdit.publisherEmail,
        publisherPhone: this.bookToEdit.publisherPhone,
        releaseDate: this.bookToEdit.releaseDate,
        category: this.bookToEdit.category,
        isAvailable: this.bookToEdit.isAvailable,
        stock: this.bookToEdit.stock || 0
      };
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.bookToEdit) {
        // Mode modification
        const updatedBook: Book = {
          id: this.bookToEdit.id,
          ...this.formData
        };
        this.bookUpdated.emit(updatedBook);
      } else {
        // Mode ajout
        this.bookAdded.emit({ ...this.formData });
      }
      
      this.resetForm();
    }
  }

  cancelEdit() {
    this.editCancelled.emit();
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      title: '',
      author: '',
      publisherEmail: '',
      publisherPhone: '',
      releaseDate: '',
      category: '',
      isAvailable: true,
      stock: 0
    };
    
    if (this.bookForm) {
      this.bookForm.resetForm();
    }
  }

  // Validation personnalisée pour le titre (ne doit pas être que des chiffres)
  isValidTitle(title: string): boolean {
    return !/^\d+$/.test(title.trim());
  }
}
