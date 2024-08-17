import createClient from 'openapi-fetch';
import { paths } from '../@types/api-types';
export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URI,
});