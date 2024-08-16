import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ApiResponse<T> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;
}

export class PaginationInfo {
  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false })
  totalCount?: number;

  @ApiProperty()
  hasNext: boolean;

  @ApiProperty()
  hasBefore: boolean;
}

export class PaginatedResponse<T> {
  @ApiProperty({ isArray: true })
  items: T[];

  @ApiProperty({ type: PaginationInfo })
  pageInfo: PaginationInfo;
}

export class PaginatorInput {
  @IsOptional()
  @ApiProperty({ required: false, default: 1 })
  page?: number;

  @IsOptional()
  @ApiProperty({ required: false, default: 15 })
  limit?: number;
}