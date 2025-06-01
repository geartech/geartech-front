import { request as baseRequest } from '../api/core/request';
import { api } from './axiosInstance';
import { OpenAPIConfig } from '../api/core/OpenAPI';
import { ApiRequestOptions } from '../api/core/ApiRequestOptions';

export const request = <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _axiosClient?: typeof api // ignora parâmetro externo
) => {
  // Força SEMPRE usar seu axiosInstance
  return baseRequest<T>(config, options, api);
};
