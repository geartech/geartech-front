'use client';

import { useRouter } from 'next/navigation';
import View from '@/components/digital/View';
import Grid, { GridColumnDef } from '@/components/digital/Grid';
import {
  geartechApi,
  PageInfoProjectDTO,
  ProjectDtoTypeEnum,
  ProjectDtoStatusEnum,
  ProjectDTO,
  SearchProjectRequest,
} from '@/core/sdk';
import { useState } from 'react';
import { Form } from '@/components/digital/Form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/digital/Button';
import { useFormRef } from '@/app/utils/useFormRef';

const { Header, Body } = View;

// Função externa para definir colunas (melhor performance)
const getColumns = (): GridColumnDef<ProjectDTO>[] => [
  { accessorKey: 'name', header: 'project', size: 200 },
  {
    accessorKey: 'type',
    header: 'type',
    columnType: 'enum',
    enumType: ProjectDtoTypeEnum,
    i18nPrefix: 'enum.projectType',
  },
  {
    accessorKey: 'status',
    header: 'status',
    columnType: 'enum',
    enumType: ProjectDtoStatusEnum,
    i18nPrefix: 'enum.projectStatus',
  },
];

export default function ProjectList() {
  const [gridData, setGridData] = useState<PageInfoProjectDTO | null>(null);
  const { t } = useTranslation();
  const formRef = useFormRef<SearchProjectRequest>();
  const router = useRouter();

  /* Handler para busca de projetos com dados do formulário */
  const handleSearch = async () => {
    try {
      // Validar formulário e mostrar erros
      const isValid = await formRef.current?.handleSubmit(async (values) => {
        const response = await geartechApi.project.listProjects({
          startDate: values?.startDate,
          endDate: values?.endDate,
          name: values?.name || '',
          pageNum: values?.pageNum || 1,
          pageSize: values?.pageSize || 10,
        });

        if (response.data) {
          setGridData(response.data);
        }
      })();

      // Se handleSubmit retornar undefined, é porque há erros
      if (isValid === undefined) {
        console.log('Formulário contém erros. Verifique os campos.');
      }
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  };

  const handleNewProject = () => {
    router.push('/pages/auth/workspace/project/ProjectForm');
  };

  return (
    <View>
      <Header
        title="Projetos"
        buttons={
          <>
            <Button buttonType="button" onClick={handleNewProject}>
              {t('newProject')}
            </Button>
            <Button buttonType="info" onClick={handleSearch}>
              {t('search')}
            </Button>
          </>
        }
      />

      <Body>
        {/* Form tipado com genéricos inline */}

        <Form<SearchProjectRequest> ref={formRef}>
          <Form.DatePicker name="startDate" label="startDate" required />
          <Form.DatePicker name="endDate" label="endDate" />

          <Form.Input
            name="name"
            label="projectName"
            placeholder="typeToFilter"
            maxLength={150}
            loading={false}
            required
          />
        </Form>

        {/* Grid com dados da busca */}
        <Grid
          title={t('listProjects')}
          columns={getColumns()}
          data={gridData?.list || []}
          crudRow
          onView={(row) => console.log('View', row)}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={async (row) => console.log('Delete', row)}
          onMultipleDelete={(ids) => console.log('Excluir ids:', ids)}
        />
      </Body>
    </View>
  );
}
