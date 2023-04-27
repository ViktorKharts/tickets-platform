import { Test, TestingModule } from '@nestjs/testing';
import { PlatformSettingsService } from './platform-settings.service';
import { PrismaService } from '../../../prisma/prisma.service';

describe('PlatformSettingsService', () => {
  let service: PlatformSettingsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformSettingsService, PrismaService],
    }).compile();

    service = module.get<PlatformSettingsService>(PlatformSettingsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
