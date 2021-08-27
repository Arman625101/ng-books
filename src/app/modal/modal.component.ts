import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared-service';
import { Genre, Author, FormCreate } from '../interface/data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() mode: any;
  @Input() item: any;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  public editForm: any = {};
  public createForm: any = {};
  public genres: Genre[] = [];
  public authors: Author[] = [];
  public path: string = this.route.url;

  constructor(
    private route: Router,
    private api: DataService,
    private _sharedService: SharedService
  ) {}

  closeModal(value: boolean) {
    this.closeModalEvent.emit(value);
  }

  onSubmit(type: string) {
    if (type === 'create') {
      this.api.create(this.createForm.value, this.mode).subscribe((info) => {
        console.log(info);
        this._sharedService.emitChange({
          item: info,
          mode: type,
        });
        this.closeModal(false);
      });
    } else if (type === 'edit') {
      console.log(this.item);
      this.api
        .update(
          {
            name: this.editForm.value.name,
            id: this.item.item.id,
            ...(this.path !== '/genres' && {
              genre: this.editForm.value.selectGenre.name,
            }),
            ...(this.path === '/books' && {
              author: this.editForm.value.selectAuthor.name,
            }),
          },
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
      this.api.delete(this.item, this.mode).subscribe((info) => {
        this.item.mode = 'delete';
        this._sharedService.emitChange(this.item);
        this.closeModal(false);
      });
    }
  }

  changeGenre() {
    if (this.path === '/books') {
      this.api.getAuthors().subscribe((info) => {
        const form =
          (this.mode.includes('edit') && this.editForm) ||
          (this.mode.includes('create') && this.createForm);
        this.authors = info.filter((obj: Author) => {
          return obj.genre === form.value.selectGenre.name;
        });
      });
    }
  }

  ngOnInit(): void {
    if (this.path !== '/genres') {
      this.api.getGenres().subscribe((info) => {
        this.genres = info;
        this.mode.includes('edit') && this.changeGenre();
      });
    }
    if (this.mode.includes('edit')) {
      this.editForm = new FormGroup({
        name: new FormControl(this.item.item.name),
        ...(this.path === '/authors' && {
          selectGenre: new FormControl('', [Validators.required]),
        }),
        ...(this.path === '/books' && {
          selectAuthor: new FormControl('', [Validators.required]),
        }),
      });
    } else if (this.mode.includes('create')) {
      this.createForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$'),
        ]),
        ...(this.path !== '/genres' && {
          selectGenre: new FormControl('', [Validators.required]),
        }),
        ...(this.path === '/books' && {
          selectAuthor: new FormControl('', [Validators.required]),
        }),
      });
    }
  }
}
