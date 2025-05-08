import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  // Массив для хранения заказов
  constructor(private readonly filmsRepository: FilmsRepository) {}
  private orders: OrderDto[] = [];
  private readonly logger = new Logger(OrderService.name);

  async create(createOrderDto: OrderDto) {
    // Получаем места для выбранного сеанса
    const scheduleId = createOrderDto.tickets[0].session;
    const occupiedSeats = await this.findOccupiedSeats(scheduleId);
    const notOccupiedSeats: string[] = [];
    const conflictSeats: string[] = [];
    this.logger.log('Запуск метода create');

    // Проверяем занятость мест для каждого билета
    for (const ticket of createOrderDto.tickets) {
      const seat = `${ticket.row}:${ticket.seat}`;
      this.logger.debug(
        `Выбранные места ряд:${ticket.row} место:${ticket.seat}`,
      );
      if (occupiedSeats.includes(seat)) {
        conflictSeats.push(seat);
      } else {
        notOccupiedSeats.push(seat);
      }
    }

    if (conflictSeats.length > 0) {
      this.logger.debug(`Занятые места:${conflictSeats.join(', ')}`);
      throw new ConflictException(
        `Места: ${conflictSeats.join(', ')} уже заняты`,
      );
    }

    await this.filmsRepository.addTaken(scheduleId, notOccupiedSeats);

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
