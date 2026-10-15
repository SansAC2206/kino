import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { FilmService } from '../services/film.services';
import { FilmDetail } from '../models/film';

@Component({
  selector: 'app-filmdetal',
  imports: [],
  templateUrl: './filmdetal.html',
  styleUrl: './filmdetal.css',
})
export class Filmdetal {
  api = inject(FilmService);
  route = inject(ActivatedRoute);
  pageTitle = inject(Title);

  film = signal<FilmDetail | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  id = 0;

  private request = new Subscription();
  private routeSubscription = new Subscription();

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.load();
    });
  }

  load(): void {
    this.request.unsubscribe();
    this.film.set(null);
    this.error.set(null);
    this.loading.set(true);

    this.request = this.api.getFilm(this.id).subscribe({
      next: (film) => {
        this.film.set(film);
        this.pageTitle.setTitle(film.nameRu ?? film.nameEn ?? 'Фильм');
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Не удалось загрузить информацию о фильме.');
        this.loading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    this.request.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
