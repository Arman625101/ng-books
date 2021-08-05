import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../data.service';
import { SharedService } from '../shared-service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  public genres: any = [];

  openModal(value: object) {
    this._sharedService.emitChange(value);
  }

  constructor(
    private dataService: DataService,
    private _sharedService: SharedService
  ) {
    this.dataService.getData('genres').subscribe((info: Data) => {
      this.genres = info;
    });
  }

  ngOnInit(): void {
    this._sharedService.changeEmitted$.subscribe((info) => {
      if (info.mode === 'create') {
        this.genres = [...this.genres, info];
      } else if (info.mode === 'delete') {
        this.genres = this.genres.filter((obj: any) => {
          return obj.id !== info.item.id;
        });
      } else if (info.mode === 'edit') {
        var foundIndex = this.genres.findIndex(
          (x: any) => x.id == info.item.id
        );
        this.genres[foundIndex] = info.item;
      }
    });
  }
}
