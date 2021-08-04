import { Output, Component, Input } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'ng-books';
  showModal: boolean = false;

  openModal = () => {
    this.showModal = true;
  };
  closeModal(value: boolean) {
    this.showModal = value;
  }
}
