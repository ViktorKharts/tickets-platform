import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketTierService } from '../services/ticket-tier.service';
import { CreateTicketTierDto } from '../dto/create-ticket-tier.dto';
import { UpdateTicketTierDto } from '../dto/update-ticket-tier.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Ticket Tier')
@Controller('ticket-tier')
export class TicketTierController {
  constructor(private readonly ticketTierService: TicketTierService) {}

  @ApiOperation({ description: 'Creates a new Ticket Tier.' })
  @ApiResponse({
    status: 200,
    description: 'Creates and returns a new Ticket Tier.',
  })
  @ApiResponse({
    status: 400,
    description:
      "User cannot provide a zero as a value to both fields and platform's cut is cannot be less than the minimum settings value.",
  })
  @ApiResponse({
    status: 500,
    description:
      "Occurs in case if platform couldn't write a new Ticket Tier database.",
  })
  @Post()
  create(@Body() createTicketTierDto: CreateTicketTierDto) {
    return this.ticketTierService.create(createTicketTierDto);
  }

  @ApiOperation({ description: 'Returns all the existing Ticket Tiers.' })
  @ApiResponse({
    status: 200,
    description:
      'Returns all the existing Ticket Tiers. Nothing ever goes wrong.',
  })
  @Get('/all')
  findAll() {
    return this.ticketTierService.findAll();
  }

  @ApiOperation({
    description: 'Returns a single Ticket Tier that matches the provided ID.',
  })
  @ApiParam({ name: 'id', example: '2f2b3409-f713-4628-af59-ef438031e967' })
  @ApiResponse({
    status: 200,
    description: 'Returns a specific Ticket Tiers.',
  })
  @ApiResponse({
    status: 400,
    description: "If the provided Ticket Tier doesn't exist.",
  })
  @ApiResponse({
    status: 500,
    description: "Occurs in case if platform couldn't read from database.",
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketTierService.findOne(id);
  }

  @ApiOperation({
    description: 'Updates a single Ticket Tier that matches the provided ID.',
  })
  @ApiParam({ name: 'id', example: '2f2b3409-f713-4628-af59-ef438031e967' })
  @ApiResponse({
    status: 200,
    description: 'Update was successful. Returns a notification only.',
  })
  @ApiResponse({
    status: 400,
    description:
      "User cannot provide a zero as a value to both fields, user cannot provide same values as the ones that already there, and platform's fee cannot be less than minimum settings value.",
  })
  @ApiResponse({
    status: 500,
    description:
      "Occurs in case if platform couldn't write a new Ticket Tier database.",
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketTierDto: UpdateTicketTierDto,
  ) {
    return this.ticketTierService.update(id, updateTicketTierDto);
  }

  @ApiOperation({
    description: 'Deletes a single Ticket Tier that matches the provided ID.',
  })
  @ApiParam({ name: 'id', example: '2f2b3409-f713-4628-af59-ef438031e967' })
  @ApiResponse({
    status: 200,
    description:
      'Deletes an existing Ticket Tier. Returns a notification only.',
  })
  @ApiResponse({
    status: 400,
    description: "If the provided Ticket Tier doesn't exist.",
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketTierService.remove(id);
  }
}
