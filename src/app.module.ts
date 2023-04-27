import { Module } from '@nestjs/common';
import { PlatformSettingsModule } from './platform-settings/platform-settings.module';
import { TicketTierModule } from './ticket-tier/ticket-tier.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PlatformSettingsModule,
    TicketTierModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
