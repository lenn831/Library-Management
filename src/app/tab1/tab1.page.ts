import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, 
         IonToolbar, 
         IonContent,
         IonSearchbar, 
         IonCard, 
         IonCardContent,
         IonCardHeader, 
         IonCardSubtitle, 
         IonCardTitle,
         IonChip,
         IonLabel } from '@ionic/angular';
import { Book, BookService } from '../services/book';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule,
     IonHeader,
     IonToolbar, 
     IonContent, 
     IonSearchbar,
     IonCard,
     IonCardContent, 
     IonCardHeader, 
     IonCardSubtitle, 
     IonCardTitle,
     IonChip,
     IonLabel,
     FormsModule],
})
export class Tab1Page implements OnInit {
  searchQuery ='';
  allBooks: Book[] = [];
  filteredBooks: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.books$.subscribe(books => {
      this.allBooks = [...books];
      this.applySearch();
    });
  }

  ionViewWillEnter(): void {
    this.allBooks = [...this.bookService.getBooks()];
    this.applySearch();
  }

  searchBooks(event: any): void {
    this.searchQuery = event.detail.value ?? '';
    this.applySearch();
  }

  private applySearch(): void {
    const query = this.searchQuery.trim().toLowerCase();

    this.filteredBooks = query
      ? this.allBooks.filter(book =>
          [book.title, book.author, book.isbn, book.category]
            .some(value => value.toLowerCase().includes(query))
        )
      : [...this.allBooks];
  }

  toggleBookStatus(book: Book): void {
    if (book.status === 'On Shelf') {
      this.bookService.checkOutBook(
        book.id,
        'Student',
        new Date().toISOString().split('T')[0]
      );
    } else {
      this.bookService.returnBook(book.id);
    }
  }
}