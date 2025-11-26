import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from './http/http-service.service';

@Module({
  imports: [HttpModule],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class CommonModule {}
