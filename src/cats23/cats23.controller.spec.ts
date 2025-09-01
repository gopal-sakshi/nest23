import { Test, TestingModule } from '@nestjs/testing';
import { Cats23Controller } from './cats23.controller';

describe('Cats23Controller', () => {
  let controller: Cats23Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Cats23Controller],
    }).compile();

    controller = module.get<Cats23Controller>(Cats23Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
