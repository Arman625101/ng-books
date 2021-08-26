export interface Genre {
  name: string;
  id: string;
}

export interface Author {
  name: string;
  id: string;
  genre: string;
}

export interface Book {
  name: string;
  id: string;
  genre: string;
  author: string;
}

export interface ModalState<Type> {
  item: Type;
  mode: string;
}
