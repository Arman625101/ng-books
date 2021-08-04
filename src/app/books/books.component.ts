import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public books: any = [];

  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((info: Data) => {
      this.books = info.books;
    });
  }

  ngOnInit(): void {}
}
