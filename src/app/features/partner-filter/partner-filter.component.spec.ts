import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerFilterComponent } from './partner-filter.component';

describe('PartnerFilterComponent', () => {
  let component: PartnerFilterComponent;
  let fixture: ComponentFixture<PartnerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
