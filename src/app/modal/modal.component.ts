import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() mode: string = '';
  @Output() closeModalEvent = new EventEmitter<boolean>();
  private regex: RegExp = /^[A-Z].*$/;

  closeModal(value: boolean) {
    this.closeModalEvent.emit(value);
  }

  onSubmit() {
    this.dataService
      .create(this.createForm.value, this.mode)
      .subscribe((info) => {
        console.log(info);
      });
  }

  createForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$'),
    ]),
    author: new FormControl(),
  });
  editForm = new FormGroup({
    name: new FormControl(''),
    author: new FormControl(''),
  });

  constructor(private route: Router, private dataService: DataService) {}

  ngOnInit(): void {
    console.log(this.mode);
    if (this.mode === 'edit') {
      this.route.url === '/genres'
        ? 'editGenre'
        : this.route.url === '/authors'
        ? 'editAuthors'
        : this.route.url === '/books'
        ? 'editBooks'
        : 'editGenre';
    } else {
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
}
