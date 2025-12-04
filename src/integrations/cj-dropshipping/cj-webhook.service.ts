import { Injectable, Logger } from '@nestjs/common';

export type CjWebhookTopic = 'PRODUCT' | string;

@Injectable()
export class CjWebhookService {
  private readonly logger = new Logger(CjWebhookService.name);

  // Example: central handler you can call from your Nest controller
  async handleEvent(topic: CjWebhookTopic, payload: any): Promise<void> {
    this.logger.debug(`CJ webhook received: ${topic}`);

    switch (topic) {
      case 'PRODUCT':
        // handle product changes: addition / deletion / modification
        await this.handleProductEvent(payload);
        break;
      default:
        this.logger.warn(`Unhandled CJ webhook topic: ${topic}`);
    }
  }

  private async handleProductEvent(payload: any): Promise<void> {
    // TODO: map CJ product message to your internal product model / sync
    this.logger.debug(`Handling CJ PRODUCT event`, payload);
  }
}

