import { Test, TestingModule } from '@nestjs/testing';
import { StorefrontsService } from './storefronts.service';

describe('StorefrontsService', () => {
  let service: StorefrontsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorefrontsService],
    }).compile();

    service = module.get<StorefrontsService>(StorefrontsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
