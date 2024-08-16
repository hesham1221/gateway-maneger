import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gateway, GatewayDocument } from './schemas/gateway.schema';
import {
  PeripheralDevice,
  PeripheralDeviceDocument,
} from './schemas/peripheral-device.schema';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { CreatePeripheralDeviceDto } from './dto/create-peripheral-device.dto';
import { GetGatewaysFilter } from './dto/get-gateways.filter';
import { paginate } from '../../libs/paginator';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
    @InjectModel(PeripheralDevice.name)
    private peripheralDeviceModel: Model<PeripheralDeviceDocument>
  ) {}

  async createGateway(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    if (createGatewayDto.devices.length > 10)
      throw new BadRequestException(
        'A gateway cannot have more than 10 peripheral devices.'
      );
    const existingSerialNumber = await this.gatewayModel.findOne({
      serialNumber: createGatewayDto.serialNumber,
    });
    if (existingSerialNumber)
      throw new BadRequestException(
        'A gateway with the same serial number already exists.'
      );
    if (createGatewayDto.devices.length > 10)
      throw new BadRequestException(
        'A gateway cannot have more than 10 peripheral devices.'
      );
    const devices = await Promise.all(
      createGatewayDto.devices.map(async (deviceDto) => {
        const newDevice = new this.peripheralDeviceModel(deviceDto);
        return await newDevice.save();
      })
    );
    const createdGateway = new this.gatewayModel({
      ...createGatewayDto,
      devices,
    });
    return createdGateway.save();
  }

  async getAllGateways(filter: GetGatewaysFilter = {}) {
    const query = {
      ...(filter.searchKey && {
        $or: [
          { name: { $regex: filter.searchKey, $options: 'i' } },
          {
            serialNumber: { $regex: filter.searchKey, $options: 'i' },
          },
        ],
      }),
    };
    const [gateways, total] = await Promise.all([
      this.gatewayModel
        .find(query)
        .populate('devices')
        .limit(filter.limit)
        .skip((filter.page - 1) * filter.limit),
      this.gatewayModel.countDocuments(query).exec(),
    ]);
    return paginate(gateways, filter.page, filter.limit, total);
  }

  async getGateway(id: string): Promise<Gateway> {
    const gateway = this.gatewayModel.findById(id).populate('devices').exec();
    if (!gateway) throw new NotFoundException('Gateway not found');
    return gateway;
  }

  async addPeripheralDevice(
    gatewayId: string,
    peripheralDevice: CreatePeripheralDeviceDto
  ): Promise<Gateway> {
    const gateway = await this.gatewayModel.findById(gatewayId).exec();

    if (!gateway) throw new NotFoundException('Gateway not found.');

    if (gateway.devices.length >= 10)
      throw new BadRequestException(
        'A gateway cannot have more than 10 peripheral devices.'
      );
    const createdPeripheralDevice = new this.peripheralDeviceModel(
      peripheralDevice
    );
    gateway.devices.push(createdPeripheralDevice);
    await createdPeripheralDevice.save();
    return gateway.save();
  }

  async removePeripheralDevice(gatewayId: string, peripheralDeviceId: string) {
    const gateway = await this.gatewayModel.findById(gatewayId).exec();
    if (!gateway) throw new NotFoundException('Gateway not found.');
    gateway.devices = gateway.devices.filter(
      (device) => device.uid.toString() !== peripheralDeviceId
    );
    await this.peripheralDeviceModel
      .findOneAndDelete({ uid: +peripheralDeviceId })
      .exec();
    await gateway.save();
    return true;
  }
}
