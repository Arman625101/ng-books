import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseURL = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getData(api: string): Observable<any> {
    return this.http.get(`${this.baseURL + api}`);
  }

  create(data: any, mode: string): Observable<any> {
    data.id = Math.random().toString(36).substr(2, 9);
    const type = mode.includes('Genre')
      ? 'genres'
      : mode.includes('Author')
      ? 'authors'
      : mode.includes('Book')
      ? 'books'
      : '';
    console.log(data);
    console.log(`${this.baseURL + type}/`);
    return this.http
      .post(`${this.baseURL + type}`, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, data);
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
