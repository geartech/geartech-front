'use client';

import { useRouter } from 'next/navigation';
import View from '@/components/digital/View';
import Grid, { GridColumnDef, GridFetchParams } from '@/components/digital/Grid';
import { geartechApi, PageInfoUserDTO, SearchUserRequest, UserDTO } from '@/core/sdk';
import { useState, useCallback } from 'react';
import { Form, FormSwitch } from '@/components/digital/Form';
import { useTranslation } from 'react-i18next';
import { useFormRef } from '@/app/utils/hooks/useFormRef';
import { formSubmit } from '@/app/utils/formSubmit';
import { Button } from '@/components/digital/Button';
import { useMessage } from '@/app/utils/hooks/useMessage';

const { Header, Body } = View;

// Função externa para definir colunas (melhor performance)
const getColumns = (): GridColumnDef<UserDTO>[] => [
  { accessorKey: 'personalNumber', header: 'personalNumber', size: 200 },
  { accessorKey: 'name', header: 'type', size: 100 },
  { accessorKey: 'email', header: 'email', size: 100 },
  { accessorKey: 'phone', header: 'phone', size: 100 },
  { accessorKey: 'expiration', header: 'expiration', size: 100 },
  { accessorKey: 'active', header: 'active', size: 100 },
];

export default function UserList() {
  const [gridData, setGridData] = useState<PageInfoUserDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchUserRequest | null>(null);

  const { t } = useTranslation();
  const formRef = useFormRef<SearchUserRequest>();
  const { showSuccess, showApiError } = useMessage();
  const router = useRouter();

  // Função de busca unificada
  const fetchUsers = useCallback(
    async (searchFilters: SearchUserRequest, params: GridFetchParams) => {
      try {
        const response = await geartechApi.user.listUsers({
          startExpiration: searchFilters?.startExpiration,
          endExpiration: searchFilters?.endExpiration,
          personalNumber: searchFilters?.personalNumber || '',
          name: searchFilters?.name || '',
          email: searchFilters?.email || '',
          active: searchFilters?.active ?? true,
          pageNum: params.pageNum,
          pageSize: params.pageSize,
          orderColumn: params.orderColumn,
          orderDirection: params.orderDirection,
        });

        if (response.data) {
          setGridData(response.data);
          // Garante que list existe antes de acessar length
          if (!response.data.list || response.data.list.length === 0) {
            showSuccess('no_data_found');
          }
        }
      } catch (error) {
        showApiError(error);
      }
    },
    [showApiError, showSuccess]
  );

  // Dispara busca quando filtros mudam (página 1)
  const handleSearch = formSubmit(formRef, async (formFilters: SearchUserRequest) => {
    setLoading(true);
    setFilters(formFilters);
    await fetchUsers(formFilters, { pageNum: 1, pageSize: 10 });
    setLoading(false);
  });

  // Callback do Grid para paginação/ordenação com filtros atuais
  const handleGridFetch = useCallback(
    (params: GridFetchParams) => {
      if (filters) {
        fetchUsers(filters, params);
      }
    },
    [filters, fetchUsers]
  );

  const handleNewUser = () => {
    router.push('/pages/auth/settings/users/UserForm?edit=true');
  };

  const handleEditUser = (row: UserDTO) => {
    router.push(`/pages/auth/settings/users/UserForm?id=${row.id}&edit=true`);
  };

  const handleViewUser = (row: UserDTO) => {
    router.push(`/pages/auth/settings/users/UserForm?id=${row.id}&edit=false`);
  };

  const handleDeleteUser = async (row: UserDTO) => {
    try {
      setLoading(true);
      await geartechApi.user.deleteUser(Number(row.id));
      showSuccess('user_deleted_successfully');
    } catch (error) {
      showApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleDeleteUser = async (ids: number[]) => {
    try {
      setLoading(true);
      await geartechApi.user.deleteMultipleUsers(ids);
      showSuccess('user_deleted_successfully');
    } catch (error) {
      showApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Header
        title={t('users')}
        buttons={
          <>
            <Button buttonType="button" onClick={handleNewUser} disabled={loading}>
              {t('new')}
            </Button>
            <Button buttonType="info" onClick={handleSearch} disabled={loading}>
              {t('search')}
            </Button>
          </>
        }
      />

      <Body>
        <Form<SearchUserRequest> ref={formRef}>
          <Form.Section title={t('filter')} layout="inline">
            <Form.DatePicker name="startExpiration" label={t('startExpiration')} compact />
            <Form.DatePicker name="endExpiration" label={t('endExpiration')} compact />
            <Form.Input
              name="personalNumber"
              label={t('personalNumber')}
              placeholder={t('typeToFilter')}
              maxLength={150}
            />
            <Form.Input name="name" label={t('name')} placeholder={t('typeToFilter')} maxLength={150} />
            <Form.Input name="email" label={t('email')} placeholder={t('typeToFilter')} maxLength={150} />
            <Form.Input name="phone" label={t('phone')} placeholder={t('typeToFilter')} maxLength={150} />
            <FormSwitch name="active" label={t('active')} />
          </Form.Section>
        </Form>

        <Grid
          title={t('listUsers')}
          columns={getColumns()}
          data={gridData?.list || []}
          crudRow
          totalRows={gridData?.total || 0}
          loading={loading}
          onFetch={handleGridFetch}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onMultipleDelete={handleMultipleDeleteUser}
        />
      </Body>
    </View>
  );
}
