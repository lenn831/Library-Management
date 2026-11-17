import { ChangeDetectorRef , Component, OnInit } from '@angular/core';
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
import { BookSearchService } from '../services/book-search.service';

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

  isSearching = false;
  aiReady = false;

  constructor(private bookService: BookService,
              private bookSearchService: BookSearchService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  this.bookService.books$.subscribe(async books => {
    this.allBooks = [...books];

    await this.bookSearchService.initialize(
      this.allBooks.map(book => ({ ...book }))
    );

    this.aiReady = true;
    this.applySearch();
    this.cdr.detectChanges();
  });
}

  ionViewWillEnter(): void {
  this.allBooks = [...this.bookService.getBooks()];
  void this.applySearch();
  }

  async searchBooks(event: any): Promise<void> {
  this.searchQuery = event.detail.value ?? '';
  await this.applySearch();
  }

  private async applySearch(): Promise<void> {
  const query = this.searchQuery.trim();

  if (!query) {
    this.filteredBooks = [...this.allBooks];
    return;
  }

  if (!this.aiReady) {
    this.filteredBooks = this.allBooks.filter(book =>
      [book.title, book.author, book.isbn, book.category]
        .some(value => value?.toLowerCase().includes(query.toLowerCase()))
    );
    return;
  }

  this.isSearching = true;

  const results = await this.bookSearchService.search(
    query,
    this.allBooks,
    5
  );

  this.filteredBooks = results.map(result => result.book);
  this.isSearching = false;
  this.cdr.detectChanges();
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