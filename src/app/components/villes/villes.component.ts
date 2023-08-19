import {Component, OnInit} from '@angular/core';
import { Ville } from 'src/app/models/ville.model';
import {VilleService} from "../../services/ville/ville.service";

@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css']
})
export class VillesComponent implements OnInit {

  constructor(private villesService: VilleService){}

  ngOnInit(): void {
  }

  villes: Ville[] = [];

  getVilles(){
    this.villesService.getVilles().subscribe(villes => this.villes = villes);
    console.log(this.villes)
  }





}
