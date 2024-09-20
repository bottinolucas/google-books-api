// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class GoogleBooksService {
//   private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
//   constructor(private http: HttpClient) {}

//   searchBooks(content: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}?q=${content}`);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  //Usando o pipe() e catchError() da RxJs
  searchBooks(content: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${content}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar os livros na API', error);
        return of([]); //Retornando um array vazio para tratar o Observable
      })
    );
  }
}
