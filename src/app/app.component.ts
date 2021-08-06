import { Component } from '@angular/core';
import { SharedService } from './shared-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'ng-books';
  showModal: boolean = false;
  mode: string = '';
  item: any = {};

  openModal(item: any) {
    this.showModal = true;
    this.mode = item.mode;
  }
  closeModal(value: boolean) {
    this.showModal = value;
  }
  constructor(private _sharedService: SharedService) {
    _sharedService.changeEmitted$.subscribe((value) => {
      this.item = value;
      this.mode = value.mode;
      this.mode === 'editing' || this.mode === 'deleting'
        ? this.openModal(value)
        : null;
    });
  }
}
