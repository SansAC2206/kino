import { Injectable, computed, signal } from '@angular/core';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root',
})
export class Favorites {
  films = signal<Film[]>(this.read());
  removedCount = signal<number>(0);

  count = computed(() => this.films().length);

  has(id: number): boolean {
    return this.films().some((film) => film.kinopoiskId === id);
  }

  toggle(film: Film): void {
    if (this.has(film.kinopoiskId)) {
      this.remove(film);
    } else {
      this.films.set([...this.films(), film]);
      this.save();
    }
  }

  remove(film: Film): void {
    this.films.set(this.films().filter((f) => f.kinopoiskId !== film.kinopoiskId));
    this.removedCount.update((n) => n + 1);
    this.save();
  }

  save(): void {
    const text = JSON.stringify(this.films());
    localStorage.setItem('favorites-bd', text);
  }

  read(): Film[] {
    try {
      const text = localStorage.getItem('favorites-bd');
      if (text === null) {
        return [];
      }
      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? (parsed as Film[]) : [];
    } catch {
      return [];
    }
  }
}
