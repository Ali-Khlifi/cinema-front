import { SimpleChange } from '@angular/core';
import { of, throwError } from 'rxjs';
import { FilmProjectionsComponent } from './film-projections.component';
import { FilmProjection } from '../../models/film-projection.model';

describe('FilmProjectionsComponent poster', () => {
  function create(getMediaFilm: jasmine.Spy): FilmProjectionsComponent {
    return new FilmProjectionsComponent(
      {} as never,
      { getMediaFilm } as never,
      {} as never,
      {} as never,
      {} as never
    );
  }

  function show(component: FilmProjectionsComponent, projection: Partial<FilmProjection>): void {
    component.filmProjection = projection as FilmProjection;
    component.ngOnChanges({
      filmProjection: new SimpleChange(undefined, component.filmProjection, true)
    });
  }

  it('shows the presigned poster and skips the legacy media', () => {
    const getMediaFilm = jasmine.createSpy('getMediaFilm');
    const component = create(getMediaFilm);

    show(component, { id: 1, film: { id: 7, title: 'Dune', posterUrl: 'https://signed.example/dune.jpg' } as never });

    expect(component.mediaFilm).toBe('https://signed.example/dune.jpg');
    expect(component.posterAlt()).toBe('Affiche de Dune');
    expect(getMediaFilm).not.toHaveBeenCalled();
  });

  it('uses the legacy media when the film has no poster url', () => {
    const getMediaFilm = jasmine.createSpy('getMediaFilm').and.returnValue(of(new Blob(['img'])));
    const component = create(getMediaFilm);

    show(component, { id: 1, film: { id: 7, title: 'Dune' } as never });

    expect(getMediaFilm).toHaveBeenCalledOnceWith(7);
  });

  it('falls back to the legacy media when the presigned image fails', () => {
    const getMediaFilm = jasmine.createSpy('getMediaFilm').and.returnValue(of(new Blob(['img'])));
    const component = create(getMediaFilm);
    show(component, { id: 1, film: { id: 7, posterUrl: 'https://signed.example/dune.jpg' } as never });

    component.onPosterError();

    expect(getMediaFilm).toHaveBeenCalledOnceWith(7);
  });

  it('clears the image when no poster can be loaded', () => {
    const getMediaFilm = jasmine.createSpy('getMediaFilm').and.returnValue(throwError(() => new Error('missing')));
    const component = create(getMediaFilm);

    show(component, { id: 1, film: { id: 7 } as never });

    expect(component.mediaFilm).toBeUndefined();
    expect(component.posterAlt()).toBe('Affiche du film');
  });
});
