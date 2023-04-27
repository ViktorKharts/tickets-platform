import { Test, TestingModule } from '@nestjs/testing';
import { TicketTierController } from './ticket-tier.controller';
import { TicketTierService } from '../services/ticket-tier.service';

describe('TicketTierController', () => {
  let controller: TicketTierController;

  const mockTicketTierService = {
    create: jest.fn(() => {
      return {
        msg: 'A new Ticket Tier has been created',
        service_fee: 35,
        buyer_price: 175,
        promoter_receives: 140,
      };
    }),
    findOne: jest.fn(() => {
      return {
        id: '2f2b3409-f713-4628-af59-ef438031e967',
        service_fee: 60,
        buyer_price: 200,
        promoter_receives: 140,
      };
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: '2f2b3409-f713-4628-af59-ef438031e967',
          service_fee: 60,
          buyer_price: 200,
          promoter_receives: 140,
        },
        {
          id: 'e8fe3475-fcdf-4015-b81c-bbdf5187000b',
          service_fee: 30,
          buyer_price: 100,
          promoter_receives: 70,
        },
      ];
    }),
    update: jest.fn(() => {
      return {
        id: '2f2b3409-f713-4628-af59-ef438031e967',
        service_fee: 60,
        buyer_price: 200,
        promoter_receives: 140,
      };
    }),
    remove: jest.fn(() => {
      return 'Ticket Tier was successfully removed.';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketTierController],
      providers: [TicketTierService],
    })
      .overrideProvider(TicketTierService)
      .useValue(mockTicketTierService)
      .compile();

    controller = module.get<TicketTierController>(TicketTierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a ticket tier', () => {
    expect(
      controller.create({ buyerPrice: 200, promoterReceives: 140 }),
    ).toEqual({
      msg: 'A new Ticket Tier has been created',
      service_fee: 35,
      buyer_price: 175,
      promoter_receives: 140,
    });
  });

  it('should return a ticket tier', () => {
    expect(controller.findOne('2f2b3409-f713-4628-af59-ef438031e967')).toEqual({
      id: '2f2b3409-f713-4628-af59-ef438031e967',
      service_fee: 60,
      buyer_price: 200,
      promoter_receives: 140,
    });
  });

  it('should return all tickets', () => {
    expect(controller.findAll()).toEqual([
      {
        id: '2f2b3409-f713-4628-af59-ef438031e967',
        service_fee: 60,
        buyer_price: 200,
        promoter_receives: 140,
      },
      {
        id: 'e8fe3475-fcdf-4015-b81c-bbdf5187000b',
        service_fee: 30,
        buyer_price: 100,
        promoter_receives: 70,
      },
    ]);
  });

  it('should update a ticket tier', () => {
    expect(
      controller.update('2f2b3409-f713-4628-af59-ef438031e967', {
        buyerPrice: 200,
        promoterReceives: 140,
      }),
    ).toEqual({
      id: '2f2b3409-f713-4628-af59-ef438031e967',
      service_fee: 60,
      buyer_price: 200,
      promoter_receives: 140,
    });
  });

  it('should remove a ticket tier', () => {
    expect(controller.remove('2f2b3409-f713-4628-af59-ef438031e967')).toEqual(
      'Ticket Tier was successfully removed.',
    );
  });
});
