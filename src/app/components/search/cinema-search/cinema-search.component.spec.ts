import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaSearchComponent } from './cinema-search.component';

describe('CinemaSearchComponent', () => {
  let component: CinemaSearchComponent;
  let fixture: ComponentFixture<CinemaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CinemaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
