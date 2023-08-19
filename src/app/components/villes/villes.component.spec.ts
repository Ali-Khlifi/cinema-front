import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillesComponent } from './villes.component';

describe('VillesComponent', () => {
  let component: VillesComponent;
  let fixture: ComponentFixture<VillesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
