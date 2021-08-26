import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { SharedService } from '../service/shared-service';
import { Genre, ModalState } from '../interface/data';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  public genres: Genre[] = [];

  openModal(value: ModalState<Genre>) {
    this._sharedService.emitChange(value);
  }

  constructor(
    private api: DataService,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.api.getGenres().subscribe((info) => {
      this.genres = info;
    });

    this._sharedService.changeEmitted$.subscribe((info: ModalState<Genre>) => {
      if (info.mode === 'create') {
        this.genres = [...this.genres, info.item];
      } else if (info.mode === 'delete') {
        this.genres = this.genres.filter((obj: Genre) => {
          return obj.id !== info.item.id;
        });
      } else if (info.mode === 'edit') {
        var foundIndex = this.genres.findIndex(
          (x: Genre) => x.id == info.item.id
        );
        this.genres[foundIndex] = info.item;
      }
    });
  }
}
