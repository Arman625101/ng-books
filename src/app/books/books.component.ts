import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books = this.dataService.data.books;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
}
