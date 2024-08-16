import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiResponse as SwaggerApiResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { ApiResponse, PaginatedResponse, PaginationInfo } from '../paginator/@types/pagintor.type';

export const ApiResponseDecorator = <TModel extends Type<unknown>>(
  model: TModel | [TModel],
  isPaginated = false,
) => {
  let responseSchema;
  if (isPaginated) {
    responseSchema = {
      allOf: [
        {
          properties: {
            code: { type: 'number' },
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                items: {
                  type: 'array',
                  items: {
                    $ref: getSchemaPath(Array.isArray(model) ? model[0] : model),
                  },
                },
                pageInfo: { $ref: getSchemaPath(PaginationInfo) },
              },
            },
          },
        },
      ],
    };
  } else if (Array.isArray(model)) {
    responseSchema = {
      allOf: [
        {
          properties: {
            code: { type: 'number' },
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'array', items: { $ref: getSchemaPath(model[0]) } },
          },
        },
      ],
    };
  } else {
    responseSchema = {
      allOf: [
        {
          properties: {
            code: { type: 'number' },
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { $ref: getSchemaPath(model) },
          },
        },
      ],
    };
  }

  const extraModels = Array.isArray(model) ? [model[0]] : [model];

  return applyDecorators(
    ApiExtraModels(
      ApiResponse,
      PaginatedResponse,
      PaginationInfo,
      ...extraModels,
    ),
    SwaggerApiResponse({ schema: responseSchema }),
  );
};
