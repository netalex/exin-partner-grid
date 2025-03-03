import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MainGridComponent } from '../../features/main-grid/main-grid.component';
import { PartnerFilterComponent } from '../../features/partner-filter/partner-filter.component';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MainGridComponent,
    PartnerFilterComponent
  ],
  template: `
  <div class="dashboard-container">
      <app-partner-filter></app-partner-filter>
      <app-main-grid></app-main-grid>
    </div>

  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }
  `]
})
export class DashboardComponent {

}
