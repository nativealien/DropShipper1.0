import { Test, TestingModule } from '@nestjs/testing';
import { StorefrontsController } from './storefronts.controller';

describe('StorefrontsController', () => {
  let controller: StorefrontsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorefrontsController],
    }).compile();

    controller = module.get<StorefrontsController>(StorefrontsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
