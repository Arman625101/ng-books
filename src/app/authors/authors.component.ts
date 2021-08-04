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

  openModal(value: string) {
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
  ngOnInit(): void {}
}
