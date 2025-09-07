/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserRequest {
  /** @format int64 */
  id?: number;
  /** @minLength 1 */
  personalNumber: string;
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  lastName: string;
  /** @minLength 1 */
  email: string;
  phone?: string;
  /** @minLength 1 */
  password: string;
  /** @format date-time */
  expiration: string;
  resetPassword: boolean;
  active: boolean;
}

export interface UserDTO {
  /** @format int64 */
  id?: number;
  personalNumber?: string;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  /** @format date-time */
  expiration?: string;
  resetPassword?: boolean;
  active?: boolean;
}

export interface ProjectRequest {
  name?: string;
  type?: string;
  technology?: string;
  description?: string;
  repoUrl?: string;
  status?: string;
}

export interface ProjectDTO {
  /** @format int64 */
  id?: number;
  name?: string;
  type?: string;
  technology?: string;
  description?: string;
  repoUrl?: string;
  status?: string;
}

export interface AuthRequest {
  /** @minLength 1 */
  username: string;
  /** @minLength 1 */
  password: string;
}

export interface UserLoginDTO {
  /** @format int64 */
  id?: number;
  personalNumber?: string;
  name?: string;
  lastName?: string;
  mail?: string;
  phone?: string;
  active?: boolean;
  permissions?: string[];
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:5000/geartech.back",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title APIs Geartech
 * @version 1.0
 * @baseUrl http://localhost:5000/geartech.back
 *
 * Documentação automática Geartech
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * No description
     *
     * @tags user-controller
     * @name UpdateUser
     * @request PUT:/user/update/{id}
     */
    updateUser: (id: string, data: UserRequest, params: RequestParams = {}) =>
      this.request<UserDTO, any>({
        path: `/user/update/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name CreateUser
     * @request POST:/user/create
     */
    createUser: (data: UserRequest, params: RequestParams = {}) =>
      this.request<UserDTO, any>({
        path: `/user/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name GetByIdUser
     * @request GET:/user/get/{id}
     */
    getByIdUser: (id: string, params: RequestParams = {}) =>
      this.request<UserDTO, any>({
        path: `/user/get/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name DeleteUser
     * @request DELETE:/user/delete/{id}
     */
    deleteUser: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/delete/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  project = {
    /**
     * No description
     *
     * @tags project-controller
     * @name UpdateProject
     * @request PUT:/project/update/{id}
     */
    updateProject: (
      id: string,
      data: ProjectRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProjectDTO, any>({
        path: `/project/update/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags project-controller
     * @name CreateProject
     * @request POST:/project/create
     */
    createProject: (data: ProjectRequest, params: RequestParams = {}) =>
      this.request<ProjectDTO, any>({
        path: `/project/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags project-controller
     * @name GetByIdProject
     * @request GET:/project/get/{id}
     */
    getByIdProject: (id: string, params: RequestParams = {}) =>
      this.request<ProjectDTO, any>({
        path: `/project/get/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags project-controller
     * @name DeleteProject
     * @request DELETE:/project/delete/{id}
     */
    deleteProject: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/project/delete/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name Refresh
     * @request POST:/auth/refresh
     */
    refresh: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/refresh`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Logout
     * @request POST:/auth/logout
     */
    logout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Login
     * @request POST:/auth/login
     */
    login: (data: AuthRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name GetLoggedUser
     * @request GET:/auth/user
     */
    getLoggedUser: (params: RequestParams = {}) =>
      this.request<UserLoginDTO, any>({
        path: `/auth/user`,
        method: "GET",
        ...params,
      }),
  };
}
