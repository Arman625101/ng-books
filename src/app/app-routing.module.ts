import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { GenresComponent } from './genres/genres.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'genres', component: GenresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
