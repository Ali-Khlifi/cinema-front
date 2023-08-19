export interface Ticket{
  id: number;
  nomClient: string;
  prix: number;
  codePayement: number;
  reservee: boolean;
  placeId: number;
  filmProjectionId: number;
}
