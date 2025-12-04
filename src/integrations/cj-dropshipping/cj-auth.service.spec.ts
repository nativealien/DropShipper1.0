import { Test, TestingModule } from '@nestjs/testing';
import { CjAuthService } from './cj-auth.service';

describe('CjAuthService', () => {
  let service: CjAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CjAuthService],
    }).compile();

    service = module.get<CjAuthService>(CjAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
