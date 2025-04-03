export class CreateOrderDto {
  tickets: {
    film: string;
    session: string;
    daytime: string;
    row: number;
    seat: number;
    price: number;
  }[];
}
