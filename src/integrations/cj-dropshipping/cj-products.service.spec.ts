import { Test, TestingModule } from '@nestjs/testing';
import { CjProductsService } from './cj-products.service';

describe('CjProductsService', () => {
  let service: CjProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CjProductsService],
    }).compile();

    service = module.get<CjProductsService>(CjProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
