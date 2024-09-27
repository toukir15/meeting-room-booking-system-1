import { TQuery } from './room.interface';

// utils/filterBuilder.ts
export const buildFilter = (query: TQuery): string[] => {
  const filters: string[] = [];

  if (query.priceMin !== undefined) {
    filters.push(`pricePerSlot >= ${query.priceMin}`);
  }
  if (query.priceMax !== undefined) {
    filters.push(`pricePerSlot <= ${query.priceMax}`);
  }
  if (query.capacityMin !== undefined) {
    filters.push(`capacity >= ${query.capacityMin}`);
  }
  if (query.capacityMax !== undefined) {
    filters.push(`capacity <= ${query.capacityMax}`);
  }

  return filters;
};
