// ===== Cliente configurado =====
export { api, geartechApi } from './client';

// ===== Tipos customizados =====
export { isApiError, hasFieldErrors } from './types';
export type { ApiResponse, ApiError, FieldError, ProcessStatus } from './types';

// ===== Enums (gerados) =====
export {
  ProjectDtoStatusEnum,
  SearchProjectRequestProjectStatusEnum,
  ServiceOrderDtoStatusEnum,
  ContentType,
  CreateServiceOrderParamsServiceTypeEnum,
  ProjectDtoTypeEnum,
  ProjectRequestTypeEnum,
  SearchProjectRequestProjectTypeEnum,
  ServiceOrderDtoServiceTypeEnum,
} from './api';

// ===== Types utilitários (gerados) =====
export type { QueryParamsType, RequestParams } from './api';

// ===== DTOs (gerados) =====
export type {
  // Principais
  ProjectDTO,
  ServiceOrderDTO,
  UserDTO,
  // Paginação
  PageInfoProjectDTO,
  PageInfoUserDTO,
  // Auth
  UserLoginDTO,
  AuthRequest,
  // Requests
  ProjectRequest,
  SearchProjectRequest,
  SearchUserRequest,
  UserRequest,
  // AST Records
  AstAnnotationRecord,
  AstConfigurationRecord,
  AstControllerRecord,
  AstDtoRecord,
  AstEndpointRecord,
  AstEntityRecord,
  AstEnumRecord,
  AstExceptionRecord,
  AstFieldRecord,
  AstMapperMyBatisJavaRecord,
  AstMapperMyBatisXmlRecord,
  AstMethodRecord,
  AstPackageRecord,
  AstProjectRecord,
  AstRelationKindRecord,
  AstRelationRecord,
  AstRepositoryRecord,
  AstServiceRecord,
  AstSqlStatementRecord,
  AstTestRecord,
  // Arquitetura
  ArchitectureInfoRecord,
  BuildInfoRecord,
  DatabaseInfoRecord,
  PackageStructureRecord,
  ProjectInfoRecord,
  // Estrutura
  BasePackageRecord,
  MainJavaRecord,
  MainResourcesRecord,
  TestJavaRecord,
  // Outros
  ApiConfig,
  FullRequestParams,
  ProjectInfoResponse,
} from './api';
