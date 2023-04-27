import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketTierDto } from './create-ticket-tier.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateTicketTierDto extends PartialType(CreateTicketTierDto) {
    @ApiProperty({
        description: 'This is the price the buyer will pay for the ticket of this Tier. NumberString.',
        example: 200,
        minimum: 0,
        default: 0,
        type: String
    })
    @IsNotEmpty()
    @IsNumberString()
    buyerPrice: number;
    
    @ApiProperty({
        description: 'This is the amount the promoter receives for a single sell of a Ticket of this Tier. NumberString.',
        example: 140,
        minimum: 0,
        default: 0,
        type: String
    })
    @IsNotEmpty()
    @IsNumberString()
    promoterReceives: number; 
}
