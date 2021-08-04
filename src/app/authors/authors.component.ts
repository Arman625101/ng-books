import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  public authors: any = [];
  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((info: Data) => {
      this.authors = info.authors;
    });
  }
  ngOnInit(): void {}
}
