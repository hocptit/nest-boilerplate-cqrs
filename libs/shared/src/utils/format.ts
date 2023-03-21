import { IResponse } from '@libs/infra/interceptors';
import moment from 'moment';

export function formatResponseSuccess<T>(response: IResponse<T>) {
  return response;
}

export function getUnixTimestamp(date = new Date()) {
  return moment(date).unix();
}
