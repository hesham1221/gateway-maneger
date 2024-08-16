import { ApiProperty } from '@nestjs/swagger';
import { DeviceStatus } from '../gateway.eum';

export class CreatePeripheralDeviceDto {
  @ApiProperty({ description: 'Vendor of the peripheral device' })
  vendor: string;

  @ApiProperty({
    description: 'Status of the peripheral device',
    enum: DeviceStatus,
  })
  status: string;
}
