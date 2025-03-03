import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { switchMap } from 'rxjs/operators';
import { PartnerService } from '../../services/partner.service';
import { PartnerDetail } from '../../services/models/partner-detail';

@Component({
  selector: 'app-partner-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="partner-detail-container">
      <div class="partner-detail-header">
        <button class="back-button" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          {{ partnerDetail?.data?.name }}
        </button>
      </div>

      <div class="partner-detail-content" *ngIf="partnerDetail">
        <!-- Partner detail content will go here -->
      </div>
    </div>
  `,
  styles: [`
    .partner-detail-container {
      padding: 20px;
    }

    .partner-detail-header {
      margin-bottom: 24px;
    }

    .back-button {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      font-weight: 500;
      padding: 8px 0;
    }

    .back-button mat-icon {
      margin-right: 8px;
    }
  `]
})
export class PartnerDetailComponent implements OnInit {
  partnerDetail: PartnerDetail | undefined; // Type should be refined based on the actual data structure

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly partnerService: PartnerService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const partnerId = Number(params.get('id'));
        return this.partnerService.getPartnerDetail(partnerId);
      })
    ).subscribe(response => {
      this.partnerDetail = response;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
