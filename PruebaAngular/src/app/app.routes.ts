import { Routes } from '@angular/router';
import { SearcherComponent } from './components/searcher/searcher.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: 'searcher', component: SearcherComponent },
  { path: 'profile/:userlogin', component: ProfileComponent },
  { path: '', redirectTo: 'searcher', pathMatch: 'full' },
  { path: '**', redirectTo: 'searcher', pathMatch: 'full' }
];
