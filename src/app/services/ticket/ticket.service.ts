import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { Ticket } from 'src/app/models/ticket.model';
import {Observable, take} from "rxjs";
import {runCommand} from "@angular/cli/src/command-builder/command-runner";
import {TicketReservation} from "../../models/ticket-reservation.model";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http : HttpClient) { }

  urlAPI = environment.API_URL;
  urlTickets = this.urlAPI + "/ticket"
  urlTicketsByProjection = this.urlAPI + "/ticket/byFilmProjection"
  urlTicketSold = this.urlAPI + "/ticket/ticketSold"


  public getTicketsByFilmProjection(filmProjectId: number) : Observable<Ticket[]> {
    let params = new HttpParams();
    params = params.append('filmProjectId', filmProjectId)
    return this.http.get <Ticket[]>(this.urlTicketsByProjection, {params: params}).pipe(take(1));
  }

  payerTickets(dataForm: TicketReservation) {
    return this.http.post(this.urlTicketSold, dataForm);
  }
}
