import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader,  
         IonToolbar,  
         IonContent, 
         IonCol, 
         IonGrid, 
         IonRow, 
         IonCard,
         IonCardHeader, 
         IonCardTitle, 
         IonCardContent,
         IonInput,
         IonItem,
         IonSelect,
         IonSelectOption,
         IonButton
        } from '@ionic/angular';
import { BookService } from '../services/book';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader,
            IonToolbar,  
            IonContent, 
            IonCol, 
            IonGrid, 
            IonRow, 
            IonCard, 
            IonCardHeader, 
            IonCardTitle, 
            IonCardContent,
            IonInput,
            IonItem,
            IonSelect,
            IonSelectOption,
            IonButton,
            CommonModule,
            FormsModule],
})
export class Tab3Page {
  title: string = '';
  author: string = '';
  isbn: string = ''
  category: string = '';

  constructor(private bookService: BookService) {}

  get totalInventoryCount(): number {
    return this.bookService.getBooks().length;
  }

  get activeStudentLoans(): number {
    return this.bookService.getBooks().filter(book => book.status === 'Checked Out').length;
  }

    get inventoryPercentage(): number {
    return this.totalInventoryCount ? 100 : 0;
  }

  get activeLoanPercentage(): number {
    if (!this.totalInventoryCount) return 0;
    return Math.round(
      (this.activeStudentLoans / this.totalInventoryCount) * 100
    );
  }

  addNewBook() {
    if (!this.title || !this.author || !this.isbn || !this.category) {
      alert('Please fill in all fields before adding a book.');
      return;
    }

    const normalizedIsbn = this.isbn.trim().toLowerCase();
    const duplicateIsbn = this.bookService.getBooks().some(
      book => book.isbn.trim().toLowerCase() === normalizedIsbn
    );

    if (duplicateIsbn) {
      alert('A book with this ISBN is already in the catalog.');
      return;
    }

    this.bookService.addBook(
      this.title.trim(),
      this.author.trim(),
      this.isbn.trim(),
      this.category.trim()
    );

    //Clear all fields instantly after adding the book to the database
    this.title = '';
    this.author = '';
    this.isbn = '';
    this.category = '';
    alert('Book added successfully!');
  }
}
