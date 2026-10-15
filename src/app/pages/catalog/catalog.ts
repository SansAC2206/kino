import { Component, computed, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { Film } from '../../models/film';
import { DEMO_FILMS } from '../../data/demo-fimls';
import { FilmCard } from '../../film-card/film-card';
import { Favorites } from '../../services/favorites';
import { FilmService } from '../../services/film.services';

@Component({
  selector: 'app-catalog',
  imports: [FilmCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {
  favorites = inject(Favorites);
  api = inject(FilmService);

  title = 'Кадр';

  films = signal<Film[]>([]);
  loading = signal(true);

  searchDraft = signal('');
  query = signal('');
  page = signal(1);
  totalPages = signal(1);

  onlyFavorites = signal(false);

  visibleFilms = computed(() => {
    const list = this.films();
    if (!this.onlyFavorites()) {
      return list;
    }
    return list.filter((film) => this.favorites.has(film.kinopoiskId));
  });

  private request = new Subscription();

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.request.unsubscribe();
    this.loading.set(true);
    this.films.set([]);

    const req =
      this.query() === ''
        ? this.api.getCollection('TOP_250_MOVIES', this.page())
        : this.api.search(this.query(), this.page());

    this.request = req.subscribe({
      next: (result) => {
        this.films.set(result.items);
        const limit = 20;
        this.totalPages.set(Math.max(1, Math.min(limit, result.totalPages)));
        this.loading.set(false);
      },
      error: (error) => {
        console.warn('API error, fallback to demo data:', error);
        this.films.set(DEMO_FILMS);
        this.totalPages.set(1);
        this.loading.set(false);
      },
    });
  }

  search(event: Event): void {
    event.preventDefault();
    this.query.set(this.searchDraft().trim());
    this.page.set(1);
    this.load();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.page.set(page);
    this.load();
  }

  ngOnDestroy(): void {
    this.request.unsubscribe();
  }
}
