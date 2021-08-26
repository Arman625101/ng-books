import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared-service';
import { Genre, Author } from '../interface/data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() mode: string = '';
  @Input() item: any;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  public editForm: any = {};
  public genres: Genre[] = [];
  public authors: Author[] = [];

  closeModal(value: boolean) {
    this.closeModalEvent.emit(value);
  }

  onSubmit(type: string) {
    if (type === 'create') {
      this.dataService
        .create(this.createForm.value, this.mode)
        .subscribe((info) => {
          const newInfo = {
            item: info,
            mode: type,
          };
          this._sharedService.emitChange(newInfo);
          this.closeModal(false);
        });
    } else if (type === 'edit') {
      this.dataService
        .update(
          {
            name: this.editForm.value.name,
            id: this.item.item.id,
            genre: this.editForm.value.selectGenre.name,
            author: this.editForm.value.selectAuthor.name,
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
      this.dataService.delete(this.item, this.mode).subscribe((info) => {
        this.item.mode = 'delete';
        this._sharedService.emitChange(this.item);
        this.closeModal(false);
      });
    }
  }

  changeGenre(e: any) {
    if (this.route.url === '/books') {
      this.dataService.getAuthors().subscribe((info) => {
        this.authors = info;
        if (this.mode.includes('edit')) {
          this.authors = info.filter((obj: Author) => {
            return obj.genre === this.editForm.value.selectGenre.name;
          });
        } else if (this.mode.includes('create')) {
          this.authors = info.filter((obj: Author) => {
            return obj.genre === this.createForm.value.selectGenre.name;
          });
        }
      });
    }
  }

  createForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$'),
    ]),
    selectGenre: new FormControl('', [
      this.route.url === '/authors'
        ? Validators.required
        : Validators.nullValidator,
    ]),
    selectAuthor: new FormControl('', [
      this.route.url === '/books'
        ? Validators.required
        : Validators.nullValidator,
    ]),
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
        selectGenre: new FormControl('', [
          this.route.url === '/authors'
            ? Validators.required
            : Validators.nullValidator,
        ]),
        selectAuthor: new FormControl('', [
          this.route.url === '/books'
            ? Validators.required
            : Validators.nullValidator,
        ]),
      });
      if (this.route.url === '/authors' || this.route.url === '/books') {
        this.dataService.getGenres().subscribe((info) => {
          this.genres = info;
          this.changeGenre('');
        });
      }
      this.mode =
        this.route.url === '/genres'
          ? 'editGenre'
          : this.route.url === '/authors'
          ? 'editAuthors'
          : this.route.url === '/books'
          ? 'editBooks'
          : 'editGenre';
    } else if (this.mode === 'create') {
      if (this.route.url === '/authors' || this.route.url === '/books') {
        this.dataService.getGenres().subscribe((info) => {
          this.genres = info;
        });
      }
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
