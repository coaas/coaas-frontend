import ky from 'ky';
import { QueryClient } from '@tanstack/react-query';

const PREFIX_URL = 'http://coaas.ru';

export const api = ky.create({ prefixUrl: PREFIX_URL });

export const queryClient = new QueryClient();
