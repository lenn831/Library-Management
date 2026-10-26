import { Injectable } from '@angular/core';

export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    category: string;
    status: 'On Shelf' | 'Checked Out';
    studentName?: string;
    studentId?: string;
    className?: string;
    dueDate?: string;
}

export interface BookDataSource {
  load(): Book[];
  save(books: Book[]): void;
}

export class LocalStorageBookDataSource implements BookDataSource {
  constructor(private readonly storageKey: string) {}

  load(): Book[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const savedData = localStorage.getItem(this.storageKey);
    if (!savedData) {
      return [];
    }

    try {
      const parsed = JSON.parse(savedData) as Book[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  save(books: Book[]): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(books));
  }
}

export class ApiBookDataSource implements BookDataSource {
  // TODO: replace this placeholder with HTTP calls once the backend is added.
  load(): Book[] {
    return [];
  }

  save(books: Book[]): void {
    void books;
  }
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly STORAGE_KEY = 'school-library-database';
  private books: Book[] = [];
  private dataSource: BookDataSource;

  private readonly defaultBooks: Book[] = [
    { id: '1', title: 'The Great Gatsby', author: '', isbn: '', category: '', status: 'On Shelf' },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780060935467', category: 'History', status: 'On Shelf' },
    { id: '3', title: '1984', author: 'George Orwell', isbn: '9780451524935', category: 'Science', status: 'On Shelf' },
    { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', category: 'Romance', status: 'On Shelf' },
    { id: '5', title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '9780316769488', category: 'Fiction', status: 'On Shelf' },
    { id: '6', title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', category: 'Fantasy', status: 'On Shelf' },
    { id: '7', title: 'Fahrenheit 451', author: 'Ray Bradbury', isbn: '9781451673319', category: 'Dystopian', status: 'On Shelf' },
    { id: '8', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', isbn: '9780544003415', category: 'Fantasy', status: 'On Shelf' },
    { id: '9', title: 'Brave New World', author: 'Aldous Huxley', isbn: '9780060850524', category: 'Dystopian', status: 'On Shelf' },
    { id: '10', title: 'Moby-Dick', author: 'Herman Melville', isbn: '9780142437247', category: 'Adventure', status: 'On Shelf' }
  ];

  constructor() {
    this.dataSource = new LocalStorageBookDataSource(this.STORAGE_KEY);
    this.loadBooks();
  }

  setDataSource(dataSource: BookDataSource): void {
    this.dataSource = dataSource;
    this.loadBooks();
  }

  // Gets the books from the configured data source or sets up starting books if empty.
  private loadBooks(): void {
    const savedBooks = this.dataSource.load();

    if (savedBooks.length > 0) {
      this.books = savedBooks;
      return;
    }

    this.books = [...this.defaultBooks];
    this.saveToStorage();
  }

  // Saves the books to the configured data source.
  private saveToStorage(): void {
    this.dataSource.save(this.books);
  }

  // Returns all books
  getBooks(): Book[] {
    return this.books;
  }

  // Adds a new book in catalog
  addBook(title: string, author: string, isbn: string, category: string): void {
    const newBook: Book = {
      id: Date.now().toString(),   // Unique ID based on timestamp
      title,
      author,
      isbn,
      category,
      status: 'On Shelf'
    };
    this.books.push(newBook);
    this.saveToStorage();
  }

  // Marks a book as checked out to a student
  checkOutBook(bookId: string, studentName: string, dueDate: string, className?: string, studentId?: string): void {
    const book = this.books.find(b => b.id === bookId);
    if (!book) return;

    book.status = 'Checked Out';
    book.studentName = studentName;
    book.studentId = studentId;
    book.className = className;
    book.dueDate = dueDate;

    this.saveToStorage();
  }

  // UPDATE OPERATION (Return): Marks a book as returned and available on shelf
  returnBook(bookId: string): void {
    const book = this.books.find(b => b.id === bookId);
    if (!book) return;

    book.status = 'On Shelf';
    delete book.studentName;
    delete book.studentId;
    delete book.className;
    delete book.dueDate;
    this.saveToStorage();
  }
}
