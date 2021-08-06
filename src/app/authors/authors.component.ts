import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../data.service';
import { SharedService } from '../shared-service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  public authors: any = [];

  openModal(value: object) {
    this._sharedService.emitChange(value);
  }

  constructor(
    private dataService: DataService,
    private _sharedService: SharedService
  ) {
    this.dataService.getData('authors').subscribe((info: Data) => {
      this.authors = info;
    });
  }
  
  ngOnInit(): void {
    this._sharedService.changeEmitted$.subscribe((info) => {
      if (info.mode === 'create') {
        this.authors = [...this.authors, info];
      } else if (info.mode === 'delete') {
        this.authors = this.authors.filter((obj: any) => {
          return obj.id !== info.item.id;
        });
      } else if (info.mode === 'edit') {
        var foundIndex = this.authors.findIndex(
          (x: any) => x.id == info.item.id
        );
        this.authors[foundIndex] = info.item;
      }
    });
  }
}
