import { Routes } from '@angular/router';
import { Catalog } from './pages/catalog/catalog';
import { Filmdetal } from './filmdetal/filmdetal';
export const routes: Routes = [
  { path: '', component: Catalog, title: 'Kino na luboi vkus' },
  { path: 'film/:id', component: Filmdetal },
  { path: '**', redirectTo: '' },
];
