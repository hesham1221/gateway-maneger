import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { CreatePeripheralDeviceDto } from './dto/create-peripheral-device.dto';
import { GetGatewaysFilter } from './dto/get-gateways.filter';
import { Gateway } from './schemas/gateway.schema';
import { ApiResponseDecorator } from '../../libs/decorators/api-response.decorator';
import { PeripheralDevice } from './schemas/peripheral-device.schema';

@Controller('gateways')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  @ApiResponseDecorator(Gateway)
  async createGateway(@Body() createGatewayDto: CreateGatewayDto) {
    return this.gatewayService.createGateway(createGatewayDto);
  }

  @Get()
  @ApiResponseDecorator([Gateway], true)
  async getAllGateways(@Query() filter: GetGatewaysFilter) {
    return this.gatewayService.getAllGateways(filter);
  }

  @Get(':name')
  @ApiResponseDecorator(Gateway)
  async getGateway(@Param('name') name: string) {
    return this.gatewayService.getGateway(name);
  }

  @Post(':id/devices')
  @ApiResponseDecorator(PeripheralDevice)
  async addDevice(
    @Param('id') id: string,
    @Body() peripheralDevice: CreatePeripheralDeviceDto
  ) {
    return this.gatewayService.addPeripheralDevice(id, peripheralDevice);
  }

  @ApiResponseDecorator(Boolean)
  @Delete(':id/devices/:deviceUId')
  async removeDevice(
    @Param('id') id: string,
    @Param('deviceUId') deviceId: string
  ) {
    return this.gatewayService.removePeripheralDevice(id, deviceId);
  }
}
