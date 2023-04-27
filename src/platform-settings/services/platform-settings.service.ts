import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlatformSettingDto } from '../dto/create-platform-setting.dto';
import { UpdatePlatformSettingDto } from '../dto/update-platform-setting.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PlatformSettingsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPlatformSettingDto: CreatePlatformSettingDto) {
    let { serviceRate, minimumFee } = createPlatformSettingDto;

    try {
      await this.prismaService.platfrom_settings.deleteMany();

      await this.prismaService.platfrom_settings.create({
        data: {
          service_fee_rate: +serviceRate,
          minimum_fee: +minimumFee,
        },
      });

      console.info('Settings created.');
      return 'Platform received new settings.';
    } catch (error) {
      console.error('Settings creation error: ', error);
      throw new HttpException(
        "Couldn't setup platform requirements.",
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  async findAll() {
    const settings = await this.prismaService.platfrom_settings.findMany();
    return settings[0];
  }

  async update(updatePlatformSettingDto: UpdatePlatformSettingDto) {
    const { serviceRate, minimumFee } = updatePlatformSettingDto;
    const currentSettings = await this.findAll();

    let occasion = 'both';
    if (
      currentSettings.service_fee_rate != serviceRate &&
      currentSettings.minimum_fee == minimumFee
    ) {
      occasion = 'rate';
    } else if (
      currentSettings.service_fee_rate == serviceRate &&
      currentSettings.minimum_fee != minimumFee
    ) {
      occasion = 'min';
    } else if (
      currentSettings.service_fee_rate == serviceRate &&
      currentSettings.minimum_fee == minimumFee
    ) {
      return 'Platform already carries these settings.';
    }

    const options = {
      both: {
        service_fee_rate: +serviceRate,
        minimum_fee: +minimumFee,
      },
      rate: {
        service_fee_rate: +serviceRate,
      },
      min: {
        minimum_fee: +minimumFee,
      },
    };

    const data = options[occasion];
    try {
      await this.prismaService.platfrom_settings.updateMany({
        data,
      });

      console.info('Settings updated.');
      return 'Settings successfully updated.';
    } catch (error) {
      console.error('Settings update error: ', error);
      throw new HttpException(
        "Couldn't update platform settings.",
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }
}
