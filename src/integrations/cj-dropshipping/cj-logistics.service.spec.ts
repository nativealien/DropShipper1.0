import { Test, TestingModule } from '@nestjs/testing';
import { CjLogisticsService } from './cj-logistics.service';

describe('CjLogisticsService', () => {
  let service: CjLogisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CjLogisticsService],
    }).compile();

    service = module.get<CjLogisticsService>(CjLogisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
