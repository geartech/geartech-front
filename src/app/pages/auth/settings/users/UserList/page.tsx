'use client';

import { useRouter } from 'next/navigation';
import View from '@/components/digital/View';
import Grid, { GridColumnDef, GridFetchParams } from '@/components/digital/Grid';
import { geartechApi, PageInfoUserDTO, SearchUserRequest, UserDTO } from '@/core/sdk';
import { useState, useCallback, useRef } from 'react';
import { Form, FormSwitch } from '@/components/digital/Form';
import { useTranslation } from 'react-i18next';
import { useFormRef } from '@/app/utils/hooks/useFormRef';
import { formSubmit } from '@/app/utils/formSubmit';

const { Header, Body } = View;

// Função externa para definir colunas (melhor performance)
const getColumns = (): GridColumnDef<UserDTO>[] => [
  { accessorKey: 'personalNumber', header: 'project', size: 200 },
  { accessorKey: 'name', header: 'type', size: 100 },
  { accessorKey: 'email', header: 'email', size: 100 },
  { accessorKey: 'phone', header: 'phone', size: 100 },
  { accessorKey: 'expiration', header: 'expiration', size: 100 },
  { accessorKey: 'active', header: 'active', size: 100 },
];

export default function UserList() {
  const [gridData, setGridData] = useState<PageInfoUserDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const formRef = useFormRef<SearchUserRequest>();
  const filtersRef = useRef<SearchUserRequest | null>(null);
  const router = useRouter();

  // Função de busca reutilizável
  const fetchUsers = useCallback(async (filters: SearchUserRequest, params: GridFetchParams) => {
    try {
      setLoading(true);
      const response = await geartechApi.user.listUsers({
        startExpiration: filters?.startExpiration,
        endExpiration: filters?.endExpiration,
        personalNumber: filters?.personalNumber || '',
        name: filters?.name || '',
        email: filters?.email || '',
        active: filters?.active ?? true,
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        orderColumn: params.orderColumn,
        orderDirection: params.orderDirection,
      });

      if (response.data) {
        setGridData(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit do form (busca inicial)
  const handleSearch = formSubmit(formRef, async (filters: SearchUserRequest) => {
    filtersRef.current = filters;
    await fetchUsers(filters, { pageNum: 1, pageSize: 10 });
  });

  // Callback do Grid para paginação/ordenação
  const handleGridFetch = useCallback(
    (params: GridFetchParams) => {
      if (filtersRef.current) {
        fetchUsers(filtersRef.current, params);
      }
    },
    [fetchUsers]
  );

  const handleNewProject = () => {
    router.push('/pages/auth/settings/users/UserForm');
  };

  return (
    <View>
      <Header
        title="Usuários"
        buttons={
          <>
            <Form.Button buttonType="submit" onClick={handleNewProject} disabled={loading}>
              {t('submit')}
            </Form.Button>
            <Form.Button buttonType="button" onClick={handleNewProject} disabled={loading}>
              {t('button')}
            </Form.Button>
            <Form.Button buttonType="cancel" onClick={handleNewProject} disabled={loading}>
              {t('cancel')}
            </Form.Button>
            <Form.Button buttonType="delete" onClick={handleNewProject} disabled={loading}>
              {t('delete')}
            </Form.Button>
            <Form.Button buttonType="reset" onClick={handleNewProject} disabled={loading}>
              {t('reset')}
            </Form.Button>
            <Form.Button buttonType="success" onClick={handleNewProject} disabled={loading}>
              {t('success')}
            </Form.Button>
            <Form.Button buttonType="warning" onClick={handleNewProject} disabled={loading}>
              {t('warning')}
            </Form.Button>
            <Form.Button
              buttonType="info"
              onClick={() => {
                handleSearch();
              }}
              disabled={loading}
            >
              {t('search')}
            </Form.Button>
          </>
        }
      />

      <Body>
        <Form<SearchUserRequest> ref={formRef}>
          <Form.Section title="filter" layout="inline">
            <Form.DatePicker name="startExpiration" label="startExpiration" compact />
            <Form.DatePicker name="endExpiration" label="endExpiration" compact />
            <Form.Input name="personalNumber" label="personalNumber" placeholder="typeToFilter" maxLength={150} />
            <Form.Input name="name" label="name" placeholder="typeToFilter" maxLength={150} />
            <Form.Input name="email" label="email" placeholder="typeToFilter" maxLength={150} />
            <Form.Input name="phone" label="phone" placeholder="typeToFilter" maxLength={150} />
            <FormSwitch name="active" label="active" />
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
          onView={(row) => console.log('View', row)}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={async (row) => console.log('Delete', row)}
          onMultipleDelete={(ids) => console.log('Excluir ids:', ids)}
        />
      </Body>
    </View>
  );
}
