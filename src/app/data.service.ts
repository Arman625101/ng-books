import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = '../assets/db.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(baseURL);
  }

  create(data: any): Observable<any> {
    console.log(data);
    return data; // this.http.post(baseURL, data);
  }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${baseURL}/${id}`, data);
  }
}
