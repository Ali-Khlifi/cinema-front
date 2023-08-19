import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmProjectionsComponent } from './film-projections.component';

describe('FilmProjectionsComponent', () => {
  let component: FilmProjectionsComponent;
  let fixture: ComponentFixture<FilmProjectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmProjectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmProjectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
