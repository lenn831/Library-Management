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

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private STORAGE_KEY = 'school-library-database';
  private books: Book[] = [];

  constructor() {
    this.loadBooks();
  }

  // Gets the books from browser or sets up starting books if empty
    private loadBooks(): void {
        if (typeof localStorage === 'undefined') {
            this.books = [];
            return;
        }

        const savedData = localStorage.getItem(this.STORAGE_KEY);

        if (!savedData) {
            this.books = [
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
            this.saveToStorage();
            return;
        }

    try {
        const parsed = JSON.parse(savedData) as Book[];
        this.books = Array.isArray(parsed) ? parsed : [];
    } catch {
        this.books = [];
    }
}

    // Saves the books to browser
    private saveToStorage(): void {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.books));
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
        delete book.dueDate;
        this.saveToStorage();
    }
}