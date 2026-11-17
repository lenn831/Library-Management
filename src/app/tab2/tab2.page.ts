import { Component, OnInit } from '@angular/core';
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

export class Tab2Page implements OnInit {

  // Controls the view that is active: 'Issue' or 'Return'
  currentSegment: 'Issue' | 'Return' = 'Issue';

  books: Book[] = [];

  // Form input variables for checking out a book
  selectedBook: string = '';
  studentName: string = '';
  studentId: string = '';
  className: string = '';
  dueDate: string = '';


  constructor(private bookService: BookService) {
    // Set a default due date to todays placeholder format
    this.dueDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.bookService.books$.subscribe(books => {
      this.books = books;
    });
  }

  get availableBooks(): Book[] {
    return this.books.filter(book => book.status === 'On Shelf');
  }

  get borrowedBooks(): Book[] {
    return this.books.filter(book => book.status === 'Checked Out');
  }

  // Switch between the 'Issue' and 'Return' segments
  segmentChanged(event: any) {
    this.currentSegment = event.detail.value;
  }

  // Submits checkout form row
  issueBook() {
    if (
  !this.selectedBook ||
  !String(this.studentName ?? '').trim() ||
  !String(this.studentId ?? '').trim() ||
  !String(this.className ?? '').trim() ||
  !this.dueDate
  ) {
    alert('Please fill in all fields to issue a book.');
    return;
  }

    // Process checkout inside database service file
    this.bookService.checkOutBook(
      this.selectedBook,
      this.studentName.trim(),
      this.dueDate,
      String(this.className ?? '').trim(),
      this.studentId.trim()
    );

    // Clear out form fields for the next process loop
    this.selectedBook = '';
    this.studentName = '';
    this.studentId = '';
    this.className = '';
    this.dueDate = new Date().toISOString().split('T')[0]
    ;

    alert('Book successfully issued.');
  }

    // Triggers the instant drop-back return workflow execution action pass
    processReturn(bookId: string) {
      this.bookService.returnBook(bookId);
      alert('Book returned safely to library.');
    }
    
}
