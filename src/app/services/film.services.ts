import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FilmList, FilmDetail } from '../models/film';
@Injectable({
  providedIn: 'root',
})
export class FilmService {
  http = inject(HttpClient);
  api = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';
  headers = {
    'X-API-KEY': '63d28fb1-f0f3-490e-ad75-8cfe6a51aabc',
    'Content-Type': 'application/json',
  };

  getCollection(type: string, page = 1) {
    return this.http.get<FilmList>(this.api + '/collections', {
      headers: this.headers,
      params: {
        type: type,
        page: page,
      },
    });
  }

  search(keyword: string, page = 1) {
    return this.http.get<FilmList>(this.api, {
      headers: this.headers,
      params: {
        keyword: keyword,
        page: page,
        order: 'NUM_VOTE',
      },
    });
  }

  getFilm(id: number) {
    return this.http.get<FilmDetail>(this.api + '/' + id, {
      headers: this.headers,
    });
  }
}
