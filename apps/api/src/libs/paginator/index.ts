import { PaginatedResponse } from './@types/pagintor.type';

export function paginate<T>(
  items: T[],
  page: number,
  limit: number,
  totalCount: number
): PaginatedResponse<T> {
  // insure first that the page and limit are valid numbers
  const intPage = +page;
  const intLimit = +limit;
  const intTotalCount = +totalCount;
  const hasNext =
    items.length === intLimit && intPage * intLimit < intTotalCount;
  const hasBefore = intPage > 1;
  return {
    items,
    pageInfo: {
      page: intPage,
      limit: intLimit,
      totalCount: intTotalCount,
      hasNext,
      hasBefore,
    },
  };
}
