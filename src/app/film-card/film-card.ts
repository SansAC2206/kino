import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Film } from '../models/film';

@Component({
  selector: 'app-film-card',
  imports: [RouterLink],
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
})
export class FilmCard {
  film = input.required<Film>();
  saved = input(false);
  toggleFavorite = output<Film>();

  countryList = computed(() =>
    this.film()
      .countries.map((c) => c.country)
      .join(', '),
  );

  isHighRated = computed(() => (this.film().ratingKinopoisk ?? 0) > 8.5);
}
