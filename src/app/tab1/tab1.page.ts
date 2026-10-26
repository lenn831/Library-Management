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
  searchQuery: string = '';
  filteredBooks: Book[] = [];

  constructor(private bookService: BookService) {}

  // ionViewWillEnter() fires every time the user clicks on the tab
  ionViewWillEnter() {
    this.searchQuery = '';
    this.filteredBooks = [];

    this.filteredBooks = this.bookService.getBooks();
}

  ngOnInit() {
    this.filteredBooks = this.bookService.getBooks();
  }

  toggleBookStatus(book: Book) {
    if (book.status === 'On Shelf') {
      this.bookService.checkOutBook(book.id, 'Student', new Date().toISOString().split('T')[0]);
    } else {
      this.bookService.returnBook(book.id);
    }

    this.filteredBooks = this.bookService.getBooks();
  }

  searchBooks(event: any) {
    const searchTerm = event.detail.value;

    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredBooks = this.bookService.getBooks();
      return;
    }

    const query = searchTerm.toLowerCase().trim();
    const allBooks = this.bookService.getBooks();

    // Basic, fast and local filtering
    this.filteredBooks = allBooks.filter(book => {
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
      );
    });
  }
}
