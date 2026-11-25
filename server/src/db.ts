import { DatabaseSync } from 'node:sqlite';

export const db = new DatabaseSync('library.sqlite');

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'On Shelf'
  );

  CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookId TEXT NOT NULL,
    studentName TEXT NOT NULL,
    studentId TEXT NOT NULL,
    className TEXT NOT NULL,
    dueDate TEXT NOT NULL,
    returnedAt TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (bookId) REFERENCES books(id)
  );
`);