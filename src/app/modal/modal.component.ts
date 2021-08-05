import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { SharedService } from '../shared-service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() mode: string = '';
  @Input() item: any = {};
  @Output() closeModalEvent = new EventEmitter<boolean>();
  private regex: RegExp = /^[A-Z].*$/;
  public editForm: any = {};

  closeModal(value: boolean) {
    this.closeModalEvent.emit(value);
  }

  onSubmit(type: String) {
    if (type === 'create') {
      this.dataService
        .create(this.createForm.value, this.mode)
        .subscribe((info) => {
          info.mode = type;
          this._sharedService.emitChange(info);
          this.closeModal(false);
        });
    } else if (type === 'edit') {
      console.log('submit', this.item);
      this.dataService
        .update(
          { name: this.editForm.value.name, id: this.item.item.id },
          this.mode
        )
        .subscribe((info) => {
          this.item.mode = 'edit';
          info.item = info;
          info.mode = 'edit';
          this._sharedService.emitChange(info);
          this.closeModal(false);
        });
    } else {
      this.dataService.delete(this.item, this.mode).subscribe((info) => {
        this.item.mode = 'delete';
        this._sharedService.emitChange(this.item);
        this.closeModal(false);
      });
    }
  }

  createForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$'),
    ]),
    author: new FormControl(),
  });

  constructor(
    private route: Router,
    private dataService: DataService,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    if (this.mode === 'editing') {
      this.editForm = new FormGroup({
        name: new FormControl(this.item.item.name),
        author: new FormControl(''),
      });
      this.mode =
        this.route.url === '/genres'
          ? 'editGenre'
          : this.route.url === '/authors'
          ? 'editAuthors'
          : this.route.url === '/books'
          ? 'editBooks'
          : 'editGenre';
    } else if (this.mode === 'create') {
      this.mode =
        this.route.url === '/genres'
          ? 'createGenre'
          : this.route.url === '/authors'
          ? 'createAuthors'
          : this.route.url === '/books'
          ? 'createBooks'
          : 'createGenre';
    } else {
      this.mode =
        this.route.url === '/genres'
          ? 'deleteGenre'
          : this.route.url === '/authors'
          ? 'deleteAuthors'
          : this.route.url === '/books'
          ? 'deleteBooks'
          : 'deleteGenre';
    }
  }
}
