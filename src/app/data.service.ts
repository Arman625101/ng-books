import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // data = [];
  constructor(private http: HttpClient) {
    this.getData().subscribe((data) => data);
  }
  public getData(): Observable<any> {
    return this.http.get('../assets/db.json');
  }
}
