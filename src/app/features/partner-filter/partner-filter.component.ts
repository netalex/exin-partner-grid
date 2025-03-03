import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { PartnerService } from '../../services/partner.service';
import { PartnerFilterService } from '../../services/partner-filter.service';


@Component({
  selector: 'app-partner-filter',
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  template: `
    <div class="filter-container">

      <div class="filter-buttons">
        <button mat-button
                [class.active]="selectedLevel === null"
                (click)="filterByLevel(null)">
          All Partners
        </button>

        <button mat-button
                *ngFor="let level of partnerLevels"
                [class.active]="selectedLevel === level.id"
                (click)="filterByLevel(level.id)"
                [style.border-color]="level.color">
          {{ level.name }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .filter-container {
      margin-bottom: 20px;
      padding: 16px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin-top: 0;
      font-size: 18px;
      color: #333;
    }

    .filter-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    button {
      border: 2px solid transparent;
      border-radius: 16px;
      padding: 6px 16px;
      transition: all 0.2s ease;
    }

    button.active {
      background-color: #f0f0f0;
      font-weight: 500;
      border-width: 2px;
      border-style: solid;
    }

    @media (max-width: 600px) {
      .filter-buttons {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  `]

})
export class PartnerFilterComponent implements OnInit {

  partnerLevels: { id: number; name: string; color: string }[] = [];
  selectedLevel: number | null = null;

  constructor(
    private readonly partnerService: PartnerService,
    private readonly filterService: PartnerFilterService
  ) {}

  ngOnInit() {
    // Load partner levels for the filter buttons
    this.partnerService.getPartners().subscribe(response => {
      if (response?.partner_levels) {
        this.partnerLevels = response.partner_levels.sort((a, b) => a.order - b.order);
      }
    });
  }

  filterByLevel(levelId: number | null) {
    this.selectedLevel = levelId;
    this.filterService.setLevelFilter(levelId);
  }

}
