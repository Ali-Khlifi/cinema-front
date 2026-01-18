import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPricesComponent } from './reservation-prices.component';

describe('ReservationPricesComponent', () => {
  let component: ReservationPricesComponent;
  let fixture: ComponentFixture<ReservationPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationPricesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
