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

  openModal(value: object) {
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

  ngOnInit(): void {
    this._sharedService.changeEmitted$.subscribe((info) => {
      if (info.mode === 'create') {
        this.books = [...this.books, info];
      } else if (info.mode === 'delete') {
        this.books = this.books.filter((obj: any) => {
          return obj.id !== info.item.id;
        });
      } else if (info.mode === 'edit') {
        var foundIndex = this.books.findIndex((x: any) => x.id == info.item.id);
        this.books[foundIndex] = info.item;
      }
    });
  }
}
