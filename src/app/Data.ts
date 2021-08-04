export interface Data {
  books: [{ name: String }];
  genres: [{ name: String }];
  authors: [{ name: String; genre: String }];
}
