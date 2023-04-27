import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreatePlatformSettingDto {
  @ApiProperty({
    description:
      "This is where you specify the platfrom's rate for the service. Measured in %, NumberString.",
    example: 30,
    minimum: 0,
    type: String
  })
  @IsNotEmpty()
  @IsNumberString()
  serviceRate: number;

  @ApiProperty({
    description:
      "This is where you specify the the platfrom's minimum cut. NumberString.",
    example: 30,
    minimum: 0,
    type: String
  })
  @IsNotEmpty()
  @IsNumberString()
  minimumFee: number;
}
