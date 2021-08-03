import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public books: any = [];

  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((info) => {
      this.books = info.books;
    });
  }

  ngOnInit(): void {}
}
