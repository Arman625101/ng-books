import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  authors = this.dataService.data.authors;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
}
