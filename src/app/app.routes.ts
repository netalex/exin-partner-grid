import { Routes } from '@angular/router';
import { MainGridComponent } from './features/main-grid/main-grid.component';

export const routes: Routes = [
  { path: '', component: MainGridComponent },
  {
    path: 'partner/:id',
    loadComponent: () => import('./features/partner-detail/partner-detail.component')
      .then(m => m.PartnerDetailComponent)
  },
  { path: '**', redirectTo: '' }
];
