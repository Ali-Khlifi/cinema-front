import {Component, Input} from '@angular/core';
import {Ticket} from "../../models/ticket.model";
import {TicketService} from "../../services/ticket/ticket.service";
import {TmplAstNode} from "@angular/compiler";
import {TicketReservation} from "../../models/ticket-reservation.model";

@Component({
  selector: 'app-ticket-payment',
  templateUrl: './ticket-payment.component.html',
  styleUrls: ['./ticket-payment.component.css']
})
export class TicketPaymentComponent {

  @Input() clientTickets!: any[];
  listIds : number[] = [];

  public constructor(private ticketService: TicketService) {
  }
  onPayTickets(dataForm: TicketReservation) {
    this.clientTickets.forEach(t => {
      this.listIds.push(t.id);
    });
    dataForm.ticketIds = this.listIds;
    this.ticketService.payerTickets(dataForm)
      .subscribe(() => {alert("Ticket reservée!");});
  }
}
