import { Test, TestingModule } from '@nestjs/testing';
import { CjWarehouseService } from './cj-warehouse.service';

describe('CjWarehouseService', () => {
  let service: CjWarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CjWarehouseService],
    }).compile();

    service = module.get<CjWarehouseService>(CjWarehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
