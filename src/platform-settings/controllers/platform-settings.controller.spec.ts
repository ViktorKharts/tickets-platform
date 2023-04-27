import { Test, TestingModule } from '@nestjs/testing';
import { PlatformSettingsController } from './platform-settings.controller';
import { PlatformSettingsService } from '../services/platform-settings.service';

describe('PlatformSettingsController', () => {
  let controller: PlatformSettingsController;

  const mockPSService = {
    findAll: jest.fn(() => {
      return {
        id: 1,
        service_fee_rate: 30,
        minimum_fee: 30,
      };
    }),
    update: jest.fn((dto) => dto),
    create: jest.fn((dto) => 'Platform received new settings.'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformSettingsController],
      providers: [PlatformSettingsService],
    })
      .overrideProvider(PlatformSettingsService)
      .useValue(mockPSService)
      .compile();

    controller = module.get<PlatformSettingsController>(
      PlatformSettingsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return platform settings', () => {
    expect(controller.findAll()).toEqual({
      id: 1,
      service_fee_rate: 30,
      minimum_fee: 30,
    });
  });

  it('should edit platform settings', () => {
    expect(
      controller.update({
        serviceRate: 30,
        minimumFee: 30,
      }),
    ).toEqual({
      serviceRate: 30,
      minimumFee: 30,
    });
  });

  it('should create new platform settings', () => {
    expect(
      controller.create({
        serviceRate: 30,
        minimumFee: 30,
      }),
    ).toEqual('Platform received new settings.');
  });
});
