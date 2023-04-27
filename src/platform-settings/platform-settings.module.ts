import { Module } from '@nestjs/common';
import { PlatformSettingsService } from './services/platform-settings.service';
import { PlatformSettingsController } from './controllers/platform-settings.controller';

@Module({
  controllers: [PlatformSettingsController],
  providers: [PlatformSettingsService]
})
export class PlatformSettingsModule {}
