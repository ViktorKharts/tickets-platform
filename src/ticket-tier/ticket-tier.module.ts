import { Module } from '@nestjs/common';
import { TicketTierService } from './services/ticket-tier.service';
import { TicketTierController } from './controllers/ticket-tier.controller';

@Module({
  controllers: [TicketTierController],
  providers: [TicketTierService]
})
export class TicketTierModule {}
