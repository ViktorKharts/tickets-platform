import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTicketTierDto } from '../dto/create-ticket-tier.dto';
import { UpdateTicketTierDto } from '../dto/update-ticket-tier.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TicketTierService {
  constructor(private prismaService: PrismaService) {}

  async create(createTicketTierDto: CreateTicketTierDto) {
    let { buyerPrice, promoterReceives } = createTicketTierDto;

    if (buyerPrice == 0 && promoterReceives == 0) {
      throw new HttpException(
        'At least one of the values should be greater than zero.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const valuesToWrite = await this.calculateRequiredValues(
      +buyerPrice,
      +promoterReceives,
    );

    try {
      await this.prismaService.ticket_tier.create({
        data: {
          service_fee: valuesToWrite.serviceFee,
          buyer_price: valuesToWrite.buyerPrice,
          promoter_receives: valuesToWrite.promoterReceives,
        },
      });

      console.info('Ticket Tier has been created.');
      return {
        service_fee: valuesToWrite.serviceFee,
        buyer_price: valuesToWrite.buyerPrice,
        promoter_receives: valuesToWrite.promoterReceives,
      };
    } catch (error) {
      console.error('Create a Ticket Tier error: ', error);
      throw new HttpException(
        'Could not create a new Ticket Tier.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    return await this.prismaService.ticket_tier.findMany();
  }

  async findOne(id: string) {
    try {
      const ticketTier = await this.prismaService.ticket_tier.findUnique({
        where: { id },
      });

      if (!ticketTier) {
        throw new HttpException(
          'Ticket Tier with such an ID does not exist.',
          HttpStatus.BAD_REQUEST,
        );
      }

      console.info('Ticket Tier has been retrieved.');
      return ticketTier;
    } catch (error) {
      console.error('Retrieve a Ticket Tier error: ', error);
      throw new HttpException(
        "Ticket Tier couldn't be retrieved.",
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  async update(id: string, updateTicketTierDto: UpdateTicketTierDto) {
    const prevTicketTier = await this.findOne(id);
    let { buyerPrice, promoterReceives } = updateTicketTierDto;

    if (buyerPrice == 0 && promoterReceives == 0) {
      throw new HttpException(
        'At least one of the values should be greater than zero.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      prevTicketTier.buyer_price == buyerPrice &&
      prevTicketTier.promoter_receives == promoterReceives
    ) {
      throw new HttpException(
        'This Ticket Tier already has these values.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const valuesToWrite = await this.calculateRequiredValues(
      +buyerPrice,
      +promoterReceives,
    );

    try {
      await this.prismaService.ticket_tier.update({
        where: { id },
        data: {
          service_fee: valuesToWrite.serviceFee,
          buyer_price: valuesToWrite.buyerPrice,
          promoter_receives: valuesToWrite.promoterReceives,
        },
      });

      console.info('Ticket Tier has been updated.');
      return 'Your Ticket Tier has been updated.';
    } catch (error) {
      console.error('Ticket Tier update error: ', error);
      throw new HttpException(
        "Ticket Tier wasn't updated.",
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prismaService.ticket_tier.delete({ where: { id } });
    return 'Ticket Tier was successfully removed.';
  }

  async calculateRequiredValues(buyerPrice: number, promoterReceives: number) {
    const response = await this.prismaService.platfrom_settings.findUnique({
      where: { id: 1 },
      select: { service_fee_rate: true, minimum_fee: true },
    });
    const { service_fee_rate: rate, minimum_fee: minFee } = response;

    if (buyerPrice == 0) {
      buyerPrice = Math.round((promoterReceives / (100 - rate)) * 100);
    }

    if (promoterReceives == 0) {
      promoterReceives = Math.round(buyerPrice - buyerPrice * (rate / 100));
    }

    const serviceFee = buyerPrice - promoterReceives;
    if (serviceFee < minFee) {
      throw new HttpException(
        "You should increase your Ticket Tier's price.",
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      buyerPrice,
      promoterReceives,
      serviceFee,
    };
  }
}
