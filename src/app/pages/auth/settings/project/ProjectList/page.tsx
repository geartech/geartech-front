'use client';

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
import { useState, useRef } from 'react';
import { Form } from '@/components/digital/Form/FormGeneric';
import { FormHandle } from '@/components/digital/Form/Form';
import { Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/digital/Button';

const { Header, Body } = View;

// Função externa para definir colunas (melhor performance)
const getColumns = (): GridColumnDef<ProjectDTO>[] => [
  { accessorKey: 'name', header: 'project', size: 200 },
  {
    accessorKey: 'type',
    header: 'type',
    columnType: 'enum' as const,
    enumType: ProjectDtoTypeEnum,
    i18nPrefix: 'enum.projectType',
  },
  {
    accessorKey: 'status',
    header: 'status',
    columnType: 'enum' as const,
    enumType: ProjectDtoStatusEnum,
    i18nPrefix: 'enum.projectStatus',
  },
];

export default function ProjectList() {
  const [gridData, setGridData] = useState<PageInfoProjectDTO | null>(null);
  const { t } = useTranslation();
  const formRef = useRef<FormHandle<SearchProjectRequest>>(null);

  /* Handler para busca de projetos com dados do formulário */
  const handleSearch = async () => {
    try {
      // Validar formulário e mostrar erros

      const isValid = await formRef.current?.handleSubmit(async (values) => {
        const response = await geartechApi.project.listProjects({
          startDate: values?.startDate,
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

  return (
    <View>
      <Header
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <span>Projetos</span>
            <Button
              buttonType="info"
              onClick={handleSearch}
            >
              {t('search')}
            </Button>
          </div>
        }
      />

      <Body>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 1,
            p: 1,
            mb: 2,
          }}
        >
          {/* Form tipado com genéricos inline */}
          <Form<SearchProjectRequest> ref={formRef}>
            <Form.DatePicker
              name="startDate"
              label="startDate"
              required
            />
            <Form.DateTimePicker
              name="endDate"
              label="endDate"
            />
            <Form.Input
              name="name"
              label="projectName"
              placeholder="typeToFilter"
              maxLength={150}
              loading={false}
              required
            />
          </Form>
        </Card>
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
