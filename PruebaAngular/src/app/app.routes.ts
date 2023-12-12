import { Routes } from '@angular/router';
import { SearcherComponent } from './components/searcher/searcher.component';

export const routes: Routes = [
  { path: 'searcher', component: SearcherComponent },
  { path: '', redirectTo: 'searcher', pathMatch: 'full' },
];
