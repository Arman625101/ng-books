import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  public authors: any = [];
  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((info) => {
      this.authors = info.authors;
    });
  }
  ngOnInit(): void {}
}
