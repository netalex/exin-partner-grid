import { Component } from '@angular/core';
import { Partner } from '../../src/services/models/partners';
import { PartnerService } from '../../src/services/partner.service';
import { PartnerDetail } from '../../src/services/models/partner-detail';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main-grid',
  imports: [CommonModule],
  template: `
<div>
      <pre class="" id="partners">{{partners$ | async | json}}</pre>
      <pre id="detail1">{{partnerDetail$ | async | json}}</pre>
</div>
  `,
  styles: ``
})
export class MainGridComponent {

  partners$: Observable<Partner[]>;
  partnerDetail$: Observable<PartnerDetail>;

  constructor(private readonly partnerService: PartnerService) {
    this.partners$ = this.partnerService.getPartners();
    this.partnerDetail$ = this.partnerService.getPartnerDetail(1);
  }

}
