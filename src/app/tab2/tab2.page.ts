import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader,
         IonToolbar, 
         IonContent, 
         IonLabel, 
         IonSegment, 
         IonSegmentButton,
         IonSelect, 
         IonSelectOption,
         IonInput, 
         IonItem,
         IonButton,
         IonList,
         IonListHeader
       } from '@ionic/angular';
import { Book, BookService } from '../services/book';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
            IonHeader, 
            IonToolbar, 
            IonContent, 
            IonLabel, 
            IonSegment, 
            IonSegmentButton, 
            IonSelect, 
            IonSelectOption,
            IonInput, 
            IonItem,
            IonButton,
            IonList,
            IonListHeader,
            CommonModule, 
            FormsModule
          ]
})
export class Tab2Page {
  // Controls the view that is active: 'Issue' or 'Return'
  currentSegment: 'Issue' | 'Return' = 'Issue';

  // Form input variables for checking out a book
  selectedBook: string = '';
  studentName: string = '';
  dueDate: string = '';

  constructor(private bookService: BookService) {
    // Set a default due date to todays placeholder format
    this.dueDate = new Date().toISOString().split('T')[0];
  }

  get availableBooks(): Book[] {
    return this.bookService.getBooks().filter(book => book.status === 'On Shelf');
  }

  get borrowedBooks(): Book[] {
    return this.bookService.getBooks().filter(book => book.status === 'Checked Out');
  }

  // Switch between the 'Issue' and 'Return' segments
  segmentChanged(event: any) {
    this.currentSegment = event.detail.value;
  }

  // Submits checkout form row
  issueBook() {
    if (!this.selectedBook || !this.studentName || !this.dueDate) {
      alert('Please fill in all fields to issue a book.');
      return;
    }

    // Process checkout inside database sercice file
    this.bookService.checkOutBook(this.selectedBook, this.studentName, this.dueDate.split('T')[0]); // Format date to YYYY-MM-DD

    // Clear out form fields for the next process loop
    this.selectedBook = '';
    this.studentName = '';
    this.dueDate = new Date().toISOString().split('T')[0]; // Reset to today's date

    alert('Book successfully issued.');
  }

    // Triggers the instant drop-back return workflow execution action pass
    processReturn(bookId: string) {
      this.bookService.returnBook(bookId);
      alert('Book returned safely to library.');
    }
  }
