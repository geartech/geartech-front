/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../../utils/requestCustom';
export class MainService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static load(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/app/test',
        });
    }
}
