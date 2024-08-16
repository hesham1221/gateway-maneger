import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DeviceStatus } from '../gateway.eum';
import { ApiProperty } from '@nestjs/swagger';

export type PeripheralDeviceDocument = PeripheralDevice & Document;
@Schema({ timestamps: true })
export class PeripheralDevice {
  @ApiProperty()
  @Prop({ unique: true })
  uid: number;

  @ApiProperty()
  @Prop({ required: true })
  vendor: string;

  @ApiProperty({ enum: DeviceStatus })
  @Prop({ required: true, enum: DeviceStatus, type: 'string' })
  status: DeviceStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export const PeripheralDeviceSchema =
  SchemaFactory.createForClass(PeripheralDevice);
