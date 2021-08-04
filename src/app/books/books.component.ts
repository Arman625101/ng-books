import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../data.service';
import { SharedService } from '../shared-service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public books: any = [];

  openModal(value: string) {
    this._sharedService.emitChange(value);
  }

  constructor(
    private dataService: DataService,
    private _sharedService: SharedService
  ) {
    this.dataService.getData('books').subscribe((info: Data) => {
      this.books = info;
    });
  }

  ngOnInit(): void {}
}
