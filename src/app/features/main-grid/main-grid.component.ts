import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PartnerService } from '../../services/partner.service';
import { Partner } from '../../services/models/partners';

// Extended interface for UI interaction states
interface PartnerWithUI extends Partner {
  showDetails?: boolean;
}

@Component({
  selector: 'app-main-grid',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
<div class="partner-grid">
<div class="partner-card-container" *ngFor="let partner of partners$ | async">
        <div class="partner-card"
             (mouseenter)="partner.showDetails = true"
             (mouseleave)="partner.showDetails = false">

          <!-- Level badge (Gold, Silver, etc.) -->
          <div class="partner-category"
               [style.background-color]="partner.partner_level_color + '20'"
               [style.color]="partner.partner_level_color">
            {{ partner.partner_level_name }}
          </div>

          <!-- Logo area -->
          <div class="partner-logo-container">
            <img *ngIf="partner.logo_url?.src"
                 [src]="partner.logo_url.src"
                 [alt]="partner.name + ' logo'"
                 class="partner-logo">
              </div>

          <!-- Budget overlay - expands upward on hover -->
          <div class="budget-overlay" [class.expanded]="partner.showDetails">
            <!-- Budget header always visible -->
            <div class="budget-header">
              <span class="budget-title">Budget</span>
              <button class="search-icon" (click)="viewPartnerDetails(partner.id, $event)">
                <mat-icon>search</mat-icon>
              </button>
            </div>

            <!-- Progress bar always visible -->
            <div class="budget-progress">
              <div class="progress-bar">
                <div class="progress-billed"
                     [style.width.%]="getBilledPercentage(partner)"></div>
                <div class="progress-allocated"
                     [style.width.%]="getAllocatedPercentage(partner)"></div>
              </div>
            </div>

            <!-- Budget Details (visible only on hover) -->
            <div class="budget-details">
              <div class="budget-row">
                <span class="dot billed-dot"></span>
                <span class="label">Billed</span>
                <span class="value">{{ getBilledPercentage(partner) }}%</span>
              </div>

              <div class="budget-row">
                <span class="dot allocated-dot"></span>
                <span class="label">Allocated</span>
                <span class="value">{{ getAllocatedPercentage(partner) }}%</span>
              </div>

              <div class="budget-row">
                <span class="dot remaining-dot"></span>
                <span class="label">Remaining</span>
                <span class="value">{{ getRemainingPercentage(partner) }}%</span>
              </div>

              <button class="profile-button" (click)="viewPartnerDetails(partner.id, $event)">
                Vedi profilo
              </button>
            </div>
          </div>
        </div>
      </div>
</div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .partner-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      padding: 16px;
    }

    .partner-card-wrapper {
      height: 300px;
    }

    .partner-card {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .partner-category {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 4px 20px;
      border-radius: 16px;
      font-size: 20px;
      font-weight: 500;
      z-index: 10;
    }

    .partner-logo-container {
      width: 100%;
      min-height: 15rem;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0px;
      border: 1px
    }

    .partner-logo {
      max-width: 80%;
      max-height: 60%;
      object-fit: contain;
    }

    /* Budget overlay that expands upward on hover */
    .budget-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 80px; /* Base height - only header and progress bar */
      background-color: white;
      transition: all 0.3s ease;
      padding: 16px;
      box-sizing: border-box;
      z-index: 5;
    }

    .budget-overlay.expanded {
      height: 220px; /* Expanded height with all details */
    }

    .budget-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .budget-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .search-icon {
      background: none;
      border: none;
      cursor: pointer;
      color: #555;
    }

    .budget-progress {
      margin-bottom: 16px;
    }

    .progress-bar {
      height: 8px;
      background-color: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
    }

    .progress-billed {
      height: 100%;
      background-color: #00a651;
    }

    .progress-allocated {
      height: 100%;
      background-color: #8bc34a;
    }

    .budget-details {
      opacity: 0;
      transition: opacity 0.2s ease 0.1s; /* Delay to improve effect */
    }

    .budget-overlay.expanded .budget-details {
      opacity: 1;
    }

    .budget-row {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .billed-dot {
      background-color: #00a651;
    }

    .allocated-dot {
      background-color: #8bc34a;
    }

    .remaining-dot {
      background-color: #e0e0e0;
    }

    .label {
      flex: 1;
      font-size: 14px;
      color: #666;
    }

    .value {
      font-weight: 500;
      color: #333;
    }

    .profile-button {
      width: 100%;
      padding: 8px 16px;
      margin-top: 12px;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      text-align: center;
      transition: background-color 0.2s;
    }

    .profile-button:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class MainGridComponent implements OnInit {
  partners$: Observable<PartnerWithUI[]>;

  constructor(
    private readonly partnerService: PartnerService,
    private readonly router: Router
  ) {
    this.partners$ = this.partnerService.getPartners().pipe(
      map(response => {
        const partners = response.partners || [];
        return partners.map(partner => ({
          ...partner,
          showDetails: false
        })) as PartnerWithUI[];
      })
    );
  }

  ngOnInit() {
    // Component initialization
  }

  /**
   * Calculate the percentage of billed budget
   */
  getBilledPercentage(partner: any): number {
    if (!partner.partner_budget) return 0;

    const budget = parseFloat(partner.partner_budget);
    const invoiced = parseFloat(partner.partner_events_invoiced || '0');

    return Math.min(Math.round((invoiced / budget) * 100), 100);
  }

  /**
   * Calculate the percentage of allocated (not yet billed) budget
   */
  getAllocatedPercentage(partner: any): number {
    if (!partner.partner_budget) return 0;

    const budget = parseFloat(partner.partner_budget);
    const notInvoiced = parseFloat(partner.partner_events_not_invoiced || '0');

    return Math.min(Math.round((notInvoiced / budget) * 100), 100);
  }

  /**
   * Calculate the percentage of remaining budget
   */
  getRemainingPercentage(partner: any): number {
    const billed = this.getBilledPercentage(partner);
    const allocated = this.getAllocatedPercentage(partner);

    return Math.max(100 - billed - allocated, 0);
  }

  /**
   * Navigate to partner detail page
   */
  viewPartnerDetails(partnerId: number, event: Event) {
    event.stopPropagation(); // Prevent event propagation to container
    this.router.navigate(['/partner', partnerId]);
  }
}
