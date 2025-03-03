import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'partner/:id',
    loadComponent: () => import('./views/partner-detail/partner-detail.component')
      .then(m => m.PartnerDetailComponent)
  },
  { path: '**', redirectTo: '' }
];
