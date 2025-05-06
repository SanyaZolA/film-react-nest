import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { beforeEach, describe, it } from 'node:test';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
