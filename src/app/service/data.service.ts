import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Author, Genre, Book } from '../interface/data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseURL = 'http://localhost:3000/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.baseURL}genres`);
  }
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.baseURL}authors`);
  }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseURL}books`);
  }
  /******************************************* */
  create(data: any, mode: string): Observable<any> {
    data.id = Math.random().toString(36).substr(2, 9);
    if (data.selectGenre) {
      data.genre = data.selectGenre.name;
      delete data.selectGenre;
    }
    if (data.selectAuthor) {
      data.author = data.selectAuthor.name;
      delete data.selectAuthor;
    }
    const type = mode.includes('Genre')
      ? 'genres'
      : mode.includes('Author')
      ? 'authors'
      : mode.includes('Book')
      ? 'books'
      : '';
    return this.http
      .post(`${this.baseURL + type}`, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  update(data: any, mode: string): Observable<any> {
    const type = mode.includes('Genre')
      ? 'genres'
      : mode.includes('Author')
      ? 'authors'
      : mode.includes('Book')
      ? 'books'
      : '';

    return this.http.put(`${this.baseURL}${type}/${data.id}`, data);
  }
  delete(data: any, mode: string): Observable<any> {
    const type = mode.includes('Genre')
      ? 'genres'
      : mode.includes('Author')
      ? 'authors'
      : mode.includes('Book')
      ? 'books'
      : '';
    return this.http.delete(`${this.baseURL}${type}/${data.item.id}`);
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
