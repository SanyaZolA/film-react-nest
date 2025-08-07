import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsRepository } from '../repository/films.repository';
import { OrderDto } from './dto/order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let mockRepository: {
    addTaken: jest.Mock;
    findOccupiedSeats: jest.Mock;
  };

  beforeEach(async () => {
    mockRepository = {
      addTaken: jest.fn(),
      findOccupiedSeats: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: FilmsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('тест создания заказа', async () => {
    const mockCreate: OrderDto = {
      tickets: [
        {
          row: 1,
          seat: 1,
          session: 'abc',
          film: '',
          daytime: '',
          price: 0,
        },
      ],
    };

    mockRepository.findOccupiedSeats.mockResolvedValue([]);
    mockRepository.addTaken.mockResolvedValue(undefined);

    const result = await service.create(mockCreate);

    expect(result).toEqual({
      total: 1,
      items: mockCreate.tickets,
    });
    expect(mockRepository.addTaken).toHaveBeenCalledWith('abc', ['1:1']);
  });

  it('тест занятых мест', async () => {
    const existingOrder: OrderDto = {
      tickets: [
        { row: 1, seat: 1, session: 'abc', film: '', daytime: '', price: 0 },
      ],
    };

    const mockCreate: OrderDto = {
      tickets: [
        { row: 1, seat: 1, session: 'abc', film: '', daytime: '', price: 0 },
      ],
    };

    (service as any).orders = [existingOrder];

    await expect(service.create(mockCreate)).rejects.toThrow(
      'Места: 1:1 уже заняты',
    );

    expect(mockRepository.addTaken).not.toHaveBeenCalled();
  });

  it('Тест списока занятых мест для указанного сеанса', async () => {
    const mockOrder: OrderDto = {
      tickets: [
        { row: 1, seat: 1, session: 'abc', film: '', daytime: '', price: 0 },
        { row: 2, seat: 2, session: 'xyz', film: '', daytime: '', price: 0 },
      ],
    };

    (service as any).orders = [mockOrder];

    const result = await service.findOccupiedSeats('abc');
    expect(result).toEqual(['1:1']);
  });
});
