import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonLabel,
} from '@ionic/angular';
import { Book, BookService } from '../services/book';

@Component({
  selector: 'app-student',
  standalone: true,
  templateUrl: './student.page.html',
  imports: [
    CommonModule,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonChip,
    IonLabel,
  ],
})
export class StudentPage implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.books$.subscribe(books => {
      this.books = books;
    });
  }

  borrow(book: Book): void {
    if (book.status !== 'On Shelf') return;

    this.bookService.checkOutBook(
      book.id,
      'Student',
      new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      '',
      sessionStorage.getItem('studentId') ?? ''
    );
  }

  returnBook(book: Book): void {
    this.bookService.returnBook(book.id);
  }
}