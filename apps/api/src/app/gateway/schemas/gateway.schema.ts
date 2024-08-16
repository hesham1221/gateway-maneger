import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PeripheralDevice } from './peripheral-device.schema';
import { ApiProperty } from '@nestjs/swagger';

export type GatewayDocument = Gateway & Document;

@Schema()
export class Gateway {
  @Prop({ required: true, unique: true })
  @ApiProperty()
  serialNumber: string;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true })
  @ApiProperty()
  ipv4: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: PeripheralDevice.name }] })
  @ApiProperty({type : PeripheralDevice , isArray : true})
  devices: PeripheralDevice[];
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
