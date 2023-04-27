import { Test, TestingModule } from '@nestjs/testing';
import { TicketTierService } from './ticket-tier.service';
import { PrismaService } from '../../../prisma/prisma.service';

describe('TicketTierService', () => {
  let service: TicketTierService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketTierService, PrismaService],
    }).compile();

    service = module.get<TicketTierService>(TicketTierService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //   it('should create a new ticket tier', async () => {
  //     prisma.platfrom_settings.findMany = jest.fn().mockReturnValueOnce({
  //       id: 1,
  //       service_fee_rate: 30,
  //       minimum_fee: 30,
  //     });
  //     prisma.ticket_tier.create = jest.fn().mockReturnValueOnce({
  //       id: '2f2b3409-f713-4628-af59-ef438031e967',
  //       service_fee: 60,
  //       buyer_price: 200,
  //       promoter_receives: 140,
  //     });

  //     expect(
  //       await service.create({
  //         buyerPrice: 200,
  //         promoterReceives: 140,
  //       }),
  //     ).toEqual({
  //       id: '2f2b3409-f713-4628-af59-ef438031e967',
  //       service_fee: 60,
  //       buyer_price: 200,
  //       promoter_receives: 140,
  //     });
  //   });
});
