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
  /** @minLength 1 */
  personalNumber: string;
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  lastName: string;
  /** @minLength 1 */
  email: string;
  phone?: string;
  password?: string;
  /** @format date-time */
  expiration: string;
  resetPassword?: boolean;
  active?: boolean;
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
  code?: string;
  name?: string;
  type?: ProjectRequestTypeEnum;
  technology?: string;
  description?: string;
  repoUrl?: string;
}

export interface ArchitectureInfoRecord {
  type?: string;
  signals?: string[];
}

export interface AstAnnotationRecord {
  name?: string;
  attrs?: Record<string, string>;
}

export interface AstConfigurationRecord {
  fqn?: string;
  simpleName?: string;
  beanMethods?: AstMethodRecord[];
  annotations?: AstAnnotationRecord[];
  classSourceCode?: string;
}

export interface AstControllerRecord {
  fqn?: string;
  basePath?: string;
  endpoints?: AstEndpointRecord[];
  classSourceCode?: string;
}

export interface AstDtoRecord {
  fqn?: string;
  simpleName?: string;
  fields?: AstFieldRecord[];
  annotations?: AstAnnotationRecord[];
  isRecord?: boolean;
  classSourceCode?: string;
}

export interface AstEndpointRecord {
  httpMethod?: string;
  path?: string;
  produces?: string;
  consumes?: string;
  methodName?: string;
  returnType?: string;
  paramTypes?: string[];
  sourceCode?: string;
}

export interface AstEntityRecord {
  fqn?: string;
  simpleName?: string;
  table?: string;
  annotations?: AstAnnotationRecord[];
  fields?: AstFieldRecord[];
  relations?: AstRelationRecord[];
  classSourceCode?: string;
}

export interface AstEnumRecord {
  fqn?: string;
  simpleName?: string;
  values?: string[];
  enumSourceCode?: string;
}

export interface AstExceptionRecord {
  fqn?: string;
  simpleName?: string;
  extendsClass?: string;
  fields?: AstFieldRecord[];
  constructors?: AstMethodRecord[];
  classSourceCode?: string;
}

export interface AstFieldRecord {
  name?: string;
  type?: string;
  annotations?: AstAnnotationRecord[];
  id?: boolean;
  column?: string;
  nullable?: boolean;
}

export interface AstMapperMyBatisJavaRecord {
  fqn?: string;
  methods?: AstMethodRecord[];
  classSourceCode?: string;
}

export interface AstMapperMyBatisXmlRecord {
  namespace?: string;
  statements?: AstSqlStatementRecord[];
  filePath?: string;
  xmlContent?: string;
}

export interface AstMethodRecord {
  name?: string;
  returnType?: string;
  paramTypes?: string[];
  annotations?: AstAnnotationRecord[];
  transactional?: boolean;
  transactionalProp?: string;
  sourceCode?: string;
}

export interface AstPackageRecord {
  name?: string;
  typesFqn?: string[];
}

export interface AstProjectRecord {
  moduleDir?: string;
  basePackage?: string;
  packages?: AstPackageRecord[];
  entities?: AstEntityRecord[];
  repositories?: AstRepositoryRecord[];
  services?: AstServiceRecord[];
  controllers?: AstControllerRecord[];
  testControllers?: AstControllerRecord[];
  mappersMyBatisJava?: AstMapperMyBatisJavaRecord[];
  mappersMyBatisXml?: AstMapperMyBatisXmlRecord[];
  dtos?: AstDtoRecord[];
  exceptions?: AstExceptionRecord[];
  configurations?: AstConfigurationRecord[];
  enums?: AstEnumRecord[];
  properties?: string[];
  sqlScripts?: string[];
  tests?: AstTestRecord[];
}

export interface AstRelationKindRecord {
  value?: string;
}

export interface AstRelationRecord {
  kind?: AstRelationKindRecord;
  targetType?: string;
  mappedBy?: string;
  joinColumn?: string;
  joinTable?: string;
}

export interface AstRepositoryRecord {
  fqn?: string;
  entityType?: string;
  idType?: string;
  classSourceCode?: string;
}

export interface AstServiceRecord {
  fqn?: string;
  methods?: AstMethodRecord[];
  hasTransactionalClassLevel?: boolean;
  classSourceCode?: string;
}

export interface AstSqlStatementRecord {
  id?: string;
  kind?: string;
  parameterType?: string;
  resultType?: string;
}

export interface AstTestRecord {
  fqn?: string;
  simpleName?: string;
  testMethods?: AstMethodRecord[];
  annotations?: AstAnnotationRecord[];
  testedClass?: string;
  classSourceCode?: string;
}

export interface BasePackageRecord {
  main?: MainJavaRecord;
  test?: TestJavaRecord;
  resources?: MainResourcesRecord;
}

export interface BuildInfoRecord {
  tool?: string;
  language?: string;
  languageVersion?: string;
  buildToolVersion?: string;
  springBootVersion?: string;
  dependencies?: string[];
  depVersions?: Record<string, string>;
}

export interface DatabaseInfoRecord {
  name?: string;
  inferredFrom?: string;
  jdbcUrl?: string;
  driver?: string;
  dialect?: string;
  username?: string;
  password?: string;
}

export interface MainJavaRecord {
  dto?: string[];
  dtoRequest?: string[];
  entity?: string[];
  repository?: string[];
  service?: string[];
  controller?: string[];
  exception?: string[];
  config?: string[];
  enumType?: string[];
  mapper_mapstruct?: string[];
  mapper_mybatis_java?: string[];
  util?: string[];
}

export interface MainResourcesRecord {
  properties?: string[];
  mapper_mybatis_xml?: string[];
  sql?: string[];
}

export interface PackageStructureRecord {
  basePackage?: BasePackageRecord;
}

export interface ProjectDTO {
  /** @format int64 */
  id?: number;
  code?: string;
  name?: string;
  type?: ProjectDtoTypeEnum;
  technology?: string;
  description?: string;
  repoUrl?: string;
  status?: ProjectDtoStatusEnum;
}

export interface ProjectInfoRecord {
  moduleDir?: string;
  module?: string;
  basePackage?: string;
  build?: BuildInfoRecord;
  database?: DatabaseInfoRecord;
  architecture?: ArchitectureInfoRecord;
  counts?: Record<string, number>;
  starters?: string[];
  notes?: string[];
  packages?: PackageStructureRecord;
}

export interface ProjectInfoResponse {
  project?: ProjectDTO;
  info?: ProjectInfoRecord;
  ast?: AstProjectRecord;
}

export interface TestJavaRecord {
  controller?: string[];
  util?: string[];
  config?: string[];
}

export interface SearchUserRequest {
  personalNumber?: string;
  name?: string;
  email?: string;
  /** @format date */
  startExpiration?: string;
  /** @format date */
  endExpiration?: string;
  active?: boolean;
  orderColumn?: string;
  orderDirection?: string;
  /** @format int32 */
  pageNum: number;
  /** @format int32 */
  pageSize: number;
}

export interface PageInfoUserDTO {
  /** @format int64 */
  total?: number;
  list?: UserDTO[];
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  startRow?: number;
  /** @format int64 */
  endRow?: number;
  /** @format int32 */
  pages?: number;
  /** @format int32 */
  prePage?: number;
  /** @format int32 */
  nextPage?: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];
  /** @format int32 */
  navigateFirstPage?: number;
  /** @format int32 */
  navigateLastPage?: number;
}

export interface ServiceOrderDTO {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  projectId?: number;
  code?: string;
  title?: string;
  description?: string;
  status?: ServiceOrderDtoStatusEnum;
  serviceType?: ServiceOrderDtoServiceTypeEnum;
  cardsSummary?: string;
  /** @format int32 */
  totalCards?: number;
  /** @format int32 */
  cardsDone?: number;
  /** @format int32 */
  cardsFailed?: number;
  /** @format int32 */
  cardsBlocked?: number;
  /** @format int64 */
  totalTokensUsed?: number;
  /** @format int64 */
  totalProcessingTimeMs?: number;
  /** @format date-time */
  executionStartedAt?: string;
  /** @format date-time */
  executionCompletedAt?: string;
}

export interface SearchProjectRequest {
  /** @format date */
  startDate?: string;
  /** @format date */
  endDate?: string;
  code?: string;
  name?: string;
  projectType?: SearchProjectRequestProjectTypeEnum;
  projectStatus?: SearchProjectRequestProjectStatusEnum;
  orderColumn?: string;
  orderDirection?: string;
  /** @format int32 */
  pageNum: number;
  /** @format int32 */
  pageSize: number;
}

export interface PageInfoProjectDTO {
  /** @format int64 */
  total?: number;
  list?: ProjectDTO[];
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  startRow?: number;
  /** @format int64 */
  endRow?: number;
  /** @format int32 */
  pages?: number;
  /** @format int32 */
  prePage?: number;
  /** @format int32 */
  nextPage?: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];
  /** @format int32 */
  navigateFirstPage?: number;
  /** @format int32 */
  navigateLastPage?: number;
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

export enum ProjectRequestTypeEnum {
  JAVA_SPRING = "JAVA_SPRING",
  REACT = "REACT",
}

export enum ProjectDtoTypeEnum {
  JAVA_SPRING = "JAVA_SPRING",
  REACT = "REACT",
}

export enum ProjectDtoStatusEnum {
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  BLOCKED = "BLOCKED",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ARCHIVED = "ARCHIVED",
}

export enum ServiceOrderDtoStatusEnum {
  CREATED = "CREATED",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum ServiceOrderDtoServiceTypeEnum {
  CRUD_BACKEND = "CRUD_BACKEND",
  MAINTENANCE = "MAINTENANCE",
}

export enum SearchProjectRequestProjectTypeEnum {
  JAVA_SPRING = "JAVA_SPRING",
  REACT = "REACT",
}

export enum SearchProjectRequestProjectStatusEnum {
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  BLOCKED = "BLOCKED",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ARCHIVED = "ARCHIVED",
}

export enum CreateServiceOrderParamsServiceTypeEnum {
  CRUD_BACKEND = "CRUD_BACKEND",
  MAINTENANCE = "MAINTENANCE",
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
 *
 * **Formato de Resposta Padrão:**
 * Todas as respostas seguem o schema `ApiResponse<T>` com campos: `status`, `processed`, `message`, `fieldErrors`, `data`.
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
    updateUser: (id: number, data: UserRequest, params: RequestParams = {}) =>
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
     * @name DeactivateUser
     * @request PUT:/user/deactivate/{id}
     */
    deactivateUser: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/deactivate/${id}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name ListUsers
     * @request POST:/user/list
     */
    listUsers: (data: SearchUserRequest, params: RequestParams = {}) =>
      this.request<PageInfoUserDTO, any>({
        path: `/user/list`,
        method: "POST",
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
    getByIdUser: (id: number, params: RequestParams = {}) =>
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
    deleteUser: (id: number, params: RequestParams = {}) =>
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
      id: number,
      data: ProjectRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProjectInfoResponse, any>({
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
     * @name ListProjects
     * @request POST:/project/list
     */
    listProjects: (data: SearchProjectRequest, params: RequestParams = {}) =>
      this.request<PageInfoProjectDTO, any>({
        path: `/project/list`,
        method: "POST",
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
      this.request<ProjectInfoResponse, any>({
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
    getByIdProject: (id: number, params: RequestParams = {}) =>
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
    deleteProject: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/project/delete/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  serviceOrder = {
    /**
     * No description
     *
     * @tags service-order-controller
     * @name CreateServiceOrder
     * @request POST:/service-order/create
     */
    createServiceOrder: (
      query: {
        /** @format int64 */
        idProject: number;
        title: string;
        description?: string;
        serviceType: CreateServiceOrderParamsServiceTypeEnum;
      },
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<ServiceOrderDTO, any>({
        path: `/service-order/create`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags service-order-controller
     * @name GetByIdServiceOrder
     * @request GET:/service-order/get/{id}
     */
    getByIdServiceOrder: (id: string, params: RequestParams = {}) =>
      this.request<ServiceOrderDTO, any>({
        path: `/service-order/get/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags service-order-controller
     * @name DeleteServiceOrder
     * @request DELETE:/service-order/delete/{id}
     */
    deleteServiceOrder: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/service-order/delete/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  card = {
    /**
     * No description
     *
     * @tags card-controller
     * @name StartCard
     * @request POST:/card/start/{idCard}
     */
    startCard: (idCard: number, params: RequestParams = {}) =>
      this.request<Record<string, string>, any>({
        path: `/card/start/${idCard}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags card-controller
     * @name GetExecutionStatus
     * @request GET:/card/execution/{executionId}
     */
    getExecutionStatus: (executionId: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/card/execution/${executionId}`,
        method: "GET",
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
