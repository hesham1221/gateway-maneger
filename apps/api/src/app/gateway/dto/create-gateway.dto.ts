import { ApiProperty } from '@nestjs/swagger';
import { CreatePeripheralDeviceDto } from './create-peripheral-device.dto';
import { IsIPv4 } from 'apps/api/src/libs/validators/is-ip-v4.validator';
import { ArrayMaxSize } from 'class-validator';
export class CreateGatewayDto {
  @ApiProperty({ description: 'Unique serial number of the gateway' })
  serialNumber: string;

  @ApiProperty({ description: 'Human-readable name of the gateway' })
  name: string;

  @ApiProperty({ description: 'IPv4 address of the gateway', example: '192.168.1.1' })
  @IsIPv4()
  ipv4: string;

  @ArrayMaxSize(10)
  @ApiProperty({ description: 'List of peripheral devices associated with the gateway', type: [CreatePeripheralDeviceDto] })
  devices: CreatePeripheralDeviceDto[];
}
