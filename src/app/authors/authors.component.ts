import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Author, ModalState } from '../interface/data';
import { DataService } from '../service/data.service';
import { SharedService } from '../service/shared-service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  public authors: Author[] = [];

  openModal(value: ModalState<Author>) {
    this._sharedService.emitChange(value);
  }

  constructor(private api: DataService, private _sharedService: SharedService) {
    this.api.getAuthors().subscribe((info) => {
      this.authors = info;
    });
  }

  ngOnInit(): void {
    this._sharedService.changeEmitted$.subscribe((info: ModalState<Author>) => {
      console.log(info.mode);
      if (info.mode === 'create') {
        this.authors = [...this.authors, info.item];
      } else if (info.mode === 'delete') {
        this.authors = this.authors.filter((obj: Author) => {
          return obj.id !== info.item.id;
        });
      } else if (info.mode === 'edit') {
        var foundIndex = this.authors.findIndex(
          (x: Author) => x.id == info.item.id
        );
        this.authors[foundIndex] = info.item;
      }
    });
  }
}
