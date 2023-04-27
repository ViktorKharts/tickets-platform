import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatformSettingDto } from './create-platform-setting.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdatePlatformSettingDto extends PartialType(CreatePlatformSettingDto) {
  @ApiProperty({
    description:
      "This is where you specify the platfrom's rate for the service. Measured in %, Integer.",
    example: 30,
    minimum: 0,
    type: String,
  })
  @IsNumberString()
  serviceRate: number;

  @ApiProperty({
    description:
      "This is where you specify the the platfrom's minimum cut . Measured in Integer.",
    example: 30,
    minimum: 0,
    type: String,
  })
  @IsNumberString()
  minimumFee: number;
}
