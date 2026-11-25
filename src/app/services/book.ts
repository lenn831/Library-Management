import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

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
  private readonly apiUrl = 'http://localhost:3000/api';
  private readonly booksSubject = new BehaviorSubject<Book[]>([]);
  readonly books$ = this.booksSubject.asObservable();

  constructor(private readonly http: HttpClient) {
    void this.loadBooks();
  }

  async loadBooks(): Promise<void> {
    const books = await firstValueFrom(
      this.http.get<Book[]>(`${this.apiUrl}/books`)
    );

    this.booksSubject.next(books);
  }

  getBooks(): Book[] {
    return this.booksSubject.value;
  }

  async addBook(
    title: string,
    author: string,
    isbn: string,
    category: string
  ): Promise<void> {
    await firstValueFrom(
      this.http.post<Book>(`${this.apiUrl}/books`, {
        title,
        author,
        isbn,
        category
      })
    );

    await this.loadBooks();
  }

  async checkOutBook(
    bookId: string,
    studentName: string,
    dueDate: string,
    className = '',
    studentId = ''
  ): Promise<void> {
    await firstValueFrom(
      this.http.post(`${this.apiUrl}/books/${bookId}/checkout`, {
        studentName,
        studentId,
        className,
        dueDate
      })
    );

    await this.loadBooks();
  }

  async returnBook(bookId: string): Promise<void> {
    await firstValueFrom(
      this.http.post(`${this.apiUrl}/books/${bookId}/return`, {})
    );

    await this.loadBooks();
  }
}