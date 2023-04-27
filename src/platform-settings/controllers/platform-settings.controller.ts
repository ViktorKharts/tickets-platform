import { Controller, Post, Body, Patch, Get } from '@nestjs/common';
import { PlatformSettingsService } from '../services/platform-settings.service';
import { CreatePlatformSettingDto } from '../dto/create-platform-setting.dto';
import { UpdatePlatformSettingDto } from '../dto/update-platform-setting.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Platform Settings')
@Controller('platform-settings')
export class PlatformSettingsController {
  constructor(
    private readonly platformSettingsService: PlatformSettingsService,
  ) {}

  @ApiOperation({
    description: 'Returns the current set of Platform settings.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the current Platfrom Settings. Nothing ever goes wrong.',
  })
  @Get()
  findAll() {
    return this.platformSettingsService.findAll();
  }
  
  @ApiOperation({
    description: 'Provides an ability to set a new set of settings.',
  })
  @ApiResponse({
    status: 200,
    description: 'New settings were set.',
  })
  @ApiResponse({
    status: 500,
    description: 'Occurs in case if platform couldn\'t write new set of settings to database.'
  })
  @Post()
  create(@Body() createPlatformSettingDto: CreatePlatformSettingDto) {
    return this.platformSettingsService.create(createPlatformSettingDto);
  }
  
  @ApiOperation({
    description: 'Edits the current set of platform settings.',
  })
  @ApiResponse({
    status: 200,
    description: 'Updates one or both fields of the current set of settings. Doesn\'t return anything, just a notification string.',
  })
  @ApiResponse({
    status: 500,
    description: 'Occurs in case if platform couldn\'t update current set of settings to database.'
  })
  @Patch()
  update(@Body() updatePlatformSettingDto: UpdatePlatformSettingDto) {
    return this.platformSettingsService.update(updatePlatformSettingDto);
  }
}
