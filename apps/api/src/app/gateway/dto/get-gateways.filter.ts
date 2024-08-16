import { ApiProperty } from '@nestjs/swagger';
import { PaginatorInput } from '../../../libs/paginator/@types/pagintor.type';

export class GetGatewaysFilter extends PaginatorInput {
  @ApiProperty({ required: false })
  searchKey?: string;
}
