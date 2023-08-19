import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film/film.service';
import {Film} from "../../models/film.model";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  constructor(private filmService: FilmService){}

  public filmes: Film[] = [];
  ngOnInit(): void {
    this.filmService.getFilms().subscribe(films => this.filmes = films);
  }


}
