import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './service/shared-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'ng-books';
  showModal: boolean = false;
  mode: string = '';
  item: any = {};

  openModal(item: any) {
    this.showModal = true;
    switch (this.route.url) {
      case '/genres':
        this.mode = `${item.mode}Genre`;
        break;
      case '/authors':
        this.mode = `${item.mode}Author`;
        break;
      case '/books':
        this.mode = `${item.mode}Book`;
        break;
      default:
        this.mode = '';
        break;
    }
  }
  closeModal(value: boolean) {
    this.showModal = value;
  }
  constructor(private _sharedService: SharedService, private route: Router) {}

  ngOnInit(): void {
    this._sharedService.changeEmitted$.subscribe((value) => {
      this.item = value;
      this.mode = value.mode;
      this.mode.includes('edit') || this.mode.includes('delete')
        ? this.openModal(value)
        : null;
    });
  }
}
