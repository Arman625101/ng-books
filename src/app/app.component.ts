import { Output, Component, Input } from '@angular/core';
import { DataService } from './data.service';
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

  openModal(value: any) {
    this.showModal = true;
    this.mode = value;
  }
  closeModal(value: boolean) {
    this.showModal = value;
  }
  constructor(private _sharedService: SharedService) {
    _sharedService.changeEmitted$.subscribe((value) => {
      this.mode = value;
      value === 'edit' ? this.openModal(value) : null;
    });
  }
}
