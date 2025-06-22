import { UserLoginDTO } from '@/core/sdk/api';

export function hasPermission(user: UserLoginDTO | null, permission?: string | string[]): boolean {
  if (!permission) return true;

  if (!user?.permissions || user.permissions.length === 0) {
    return false;
  }

  if (typeof permission === 'string') {
    return user.permissions.includes(permission);
  }

  return permission.some((perm) => user.permissions?.includes(perm));
}
