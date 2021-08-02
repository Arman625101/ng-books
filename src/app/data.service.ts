import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: Data = {
    books: [
      'In Search of Lost Time',
      'Ulysses',
      'Don Quixote',
      'The Great Gatsby',
      'War and Peace',
    ],
    genres: [
      'Action',
      'Mystery',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Romance',
      'Thriller',
    ],
    authors: [
      'William Shakespeare ',
      'William Faulkner',
      'Henry James',
      'Jane Austen',
      'Charles Dickens',
      'Fyodor Dostoevsky',
      'Ernest Hemingway',
      'Franz Kafka',
    ],
  };
  constructor() {}
}
