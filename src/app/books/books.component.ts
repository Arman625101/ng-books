import { Component, OnInit } from '@angular/core';
import { Book, ModalState } from '../interface/data';
import { DataService } from '../service/data.service';
import { SharedService } from '../service/shared-service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public books: Book[] = [];

  openModal(value: ModalState<Book>) {
    this._sharedService.emitChange(value);
  }

  constructor(
    private api: DataService,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.api.getBooks().subscribe((info) => {
      this.books = info;
    });

    this._sharedService.changeEmitted$.subscribe((info: ModalState<Book>) => {
      console.log(info);
      if (info.mode === 'create') {
        this.books = [...this.books, info.item];
      } else if (info.mode === 'delete') {
        this.books = this.books.filter((obj: Book) => {
          return obj.id !== info.item.id;
        });
      } else if (info.mode === 'edit') {
        var foundIndex = this.books.findIndex(
          (x: Book) => x.id == info.item.id
        );
        this.books[foundIndex] = info.item;
      }
    });
  }
}
