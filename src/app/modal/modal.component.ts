import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  public mode: string | null = '';

  closeModal(value: boolean) {
    this.closeModalEvent.emit(value);
  }
  createForm = new FormGroup({
    name: new FormControl(''),
    author: new FormControl(''),
  });
  editForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.mode =
      this.route.url === '/genres'
        ? 'createGenre'
        : this.route.url === '/authors'
        ? 'createAuthors'
        : this.route.url === '/books'
        ? 'createBooks'
        : 'createGenre';
  }
}
