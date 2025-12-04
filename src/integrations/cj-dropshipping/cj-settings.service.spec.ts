import { Test, TestingModule } from '@nestjs/testing';
import { CjSettingsService } from './cj-settings.service';

describe('CjSettingsService', () => {
  let service: CjSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CjSettingsService],
    }).compile();

    service = module.get<CjSettingsService>(CjSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
