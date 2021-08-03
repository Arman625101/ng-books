import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  public genres: any = [];
  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((info) => {
      this.genres = info.genres;
    });
  }

  ngOnInit(): void {}
}
