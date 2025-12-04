import { Test, TestingModule } from '@nestjs/testing';
import { CjWebhookService } from './cj-webhook.service';

describe('CjWebhookService', () => {
  let service: CjWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CjWebhookService],
    }).compile();

    service = module.get<CjWebhookService>(CjWebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
