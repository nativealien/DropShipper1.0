import { Test, TestingModule } from '@nestjs/testing';
import { CjShoppingService } from './cj-shopping.service';

describe('CjShoppingService', () => {
  let service: CjShoppingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CjShoppingService],
    }).compile();

    service = module.get<CjShoppingService>(CjShoppingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
