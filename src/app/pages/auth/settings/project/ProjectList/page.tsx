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
import { useState } from 'react';
import { Form } from '@/components/digital/Form';
import { Card } from '@mui/material';
import { useTranslation } from 'react-i18next';

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

  /* Handler para busca de projetos com dados do formulário */
  const handleSearch = async (data: unknown) => {
    try {
      const searchData = data as SearchProjectRequest;
      if (!searchData) return;

      const response = await geartechApi.project.listProjects({
        name: searchData.name || '',
        pageNum: searchData.pageNum || 1,
        pageSize: searchData.pageSize || 10,
      });

      if (response.data) {
        setGridData(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  };

  return (
    <View>
      <Header title="Projetos" />
      <Body>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 1,
            p: 1,
            mb: 2,
          }}
        >
          {/* Form com inputs e buttons inline */}
          <Form<SearchProjectRequest>>
            <Form.DatePicker
              name="name"
              label="projectName"
            />
            <Form.DateTimePicker
              name="name"
              label="projectName"
            />
            <Form.TimePicker
              name="name"
              label="projectName"
            />
            <Form.Input
              name="name"
              label="projectName"
              placeholder="typeToFilter"
              maxLength={150}
              loading={false}
            />
            <Form.Actions variant="search">
              <Form.Button
                buttonType="info"
                onClick={handleSearch}
              >
                {t('search')}
              </Form.Button>
            </Form.Actions>
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
