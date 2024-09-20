import { Component } from '@angular/core';
import { GoogleBooksService } from '../google-books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  books: any[] = [];
  favorites: any[] = [];
  searchContent: string = '';
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private service: GoogleBooksService) {}

  ngOnInit(): void {}

  //Usando o subscribe() da RxJs a fim de iniciar a execucao e definir como os valores do Observable (searchBooks) serao emitidos
  searchBooks(): void {
    if (this.searchContent.trim()) {
      this.service.searchBooks(this.searchContent).subscribe((data) => {
        this.books = data.items || [];
      });
    }
    this.searchContent = '';
  }

  toggleFavorite(book: any): void {
    const index = this.favorites.findIndex((fav) => fav.id === book.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(book);
    }
  }

  isFavorite(book: any): boolean {
    return this.favorites.some((fav) => fav.id === book.id);
  }

  rateBook(book: any, rating: number): void {
    book.rating = rating;
  }
}
