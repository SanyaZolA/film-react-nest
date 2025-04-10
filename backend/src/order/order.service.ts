import { Injectable, ConflictException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  // Массив для хранения заказов
  private orders: OrderDto[] = [];

  async create(createOrderDto: OrderDto) {
    // Получаем места для выбранного сеанса
    const occupiedSeats = await this.findOccupiedSeats(
      createOrderDto.tickets[0].session,
    );
    const notOccupiedSeats: string[] = [];
    const conflictSeats: string[] = [];

    // Проверяем занятость мест для каждого билета
    for (const ticket of createOrderDto.tickets) {
      const seat = `${ticket.row}:${ticket.seat}`;
      if (occupiedSeats.includes(seat)) {
        conflictSeats.push(seat);
      } else {
        notOccupiedSeats.push(seat);
      }
    }

    if (conflictSeats.length > 0) {
      throw new ConflictException(
        `Места: ${conflictSeats.join(', ')} уже заняты`,
      );
    }

    // Создаем заказ, добавляя билеты в массив заказов
    const order = {
      tickets: createOrderDto.tickets,
    };
    this.orders.push(order);

    // Возвращаем созданный заказ
    return { total: order.tickets.length, items: order.tickets };
  }

  async findOccupiedSeats(sessionId: string): Promise<string[]> {
    const occupiedSeats: string[] = [];

    // Перебираем все заказы и добавляем занятые места для нужного сеанса
    this.orders.forEach((order) => {
      order.tickets.forEach((ticket) => {
        if (ticket.session === sessionId) {
          occupiedSeats.push(`${ticket.row}:${ticket.seat}`);
        }
      });
    });

    return occupiedSeats;
  }
}
