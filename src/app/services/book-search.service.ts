import { Injectable } from '@angular/core';
import { pipeline } from '@huggingface/transformers';
import { Book } from './book';

@Injectable({ providedIn: 'root' })
export class BookSearchService {
  private embedder: any;
  private vectors: number[][] = [];

  async initialize(books: Book[]): Promise<void> {
    this.embedder = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );

    this.vectors = [];

    for (const book of books) {
      const text =
        `${book.title} ${book.author} ${book.isbn} ${book.category}`;

      const output = await this.embedder(text, {
        pooling: 'mean',
        normalize: true,
      });

      this.vectors.push(Array.from(output.data as ArrayLike<number>));
    }
  }

  async search(
    query: string,
    books: Book[],
    limit = 5
  ): Promise<{ book: Book; score: number }[]> {
    if (!this.embedder || !query.trim()) {
      return [];
    }

    const output = await this.embedder(query, {
      pooling: 'mean',
      normalize: true,
    });

    const queryVector: number[] = Array.from(
         output.data as ArrayLike<number>
        );

    return books
      .map((book, index) => ({
        book,
        score: this.cosineSimilarity(queryVector, this.vectors[index]),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    let sum = 0;

    for (let i = 0; i < a.length; i++) {
      sum += a[i] * b[i];
    }

    return sum;
  }
}