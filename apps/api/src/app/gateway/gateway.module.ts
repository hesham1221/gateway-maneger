import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Gateway, GatewaySchema } from './schemas/gateway.schema';
import {
  PeripheralDevice,
  PeripheralDeviceSchema,
} from './schemas/peripheral-device.schema';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gateway.name, schema: GatewaySchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: PeripheralDevice.name,
        async useFactory(connection) {
          const schema = PeripheralDeviceSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-sequence')(connection), {
            inc_field: 'uid',
          });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
