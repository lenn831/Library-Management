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

  addNewBook() {
    if (this.title && this.author && this.isbn && this.category) {
      this.bookService.addBook(this.title, this.author, this.isbn, this.category);
      this.title = '';
      this.author = '';
      this.isbn = '';
      this.category = '';
    } else {
      alert('Please fill in all of the fields!');
    }

    // Call local database service to add the book to the database
    this.bookService.addBook(this.title, this.author, this.isbn, this.category);

    //Clear all fields instantly after adding the book to the database
    this.title = '';
    this.author = '';
    this.isbn = '';
    this.category = '';
    alert('Book added successfully!');
  }
}
