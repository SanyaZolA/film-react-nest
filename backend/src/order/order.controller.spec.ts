import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  const mockOrderService = {
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('тест Post', async () => {
    const mockOrder: OrderDto = {
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

    const result = { total: 1, items: mockOrder.tickets };

    mockOrderService.create.mockResolvedValue(result);

    const response = await request(app.getHttpServer())
      .post('/order')
      .send(mockOrder)
      .expect(201);

    expect(response.body).toEqual(result);
    expect(mockOrderService.create).toHaveBeenCalledWith(mockOrder);
  });
});
