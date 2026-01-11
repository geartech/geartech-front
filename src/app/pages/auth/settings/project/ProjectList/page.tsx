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

  /* Handler para limpar formulário */
  const handleClear = () => {
    console.log('Formulário resetado');
    setGridData(null);
  };

  /* Handler para deletar com dados do form */
  const handleDelete = async (data: unknown) => {
    const searchData = data as SearchProjectRequest;
    console.log('Deletar projetos com filtro:', searchData);
    // Aqui você teria a lógica de deletar múltiplos projetos baseado no filtro
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
            <Form.Input
              name="name"
              label="projectName"
              placeholder="typeToFilter"
            />
            <Form.Button
              buttonType="info"
              onClick={handleSearch}
            >
              Buscar
            </Form.Button>
            <Form.Button
              buttonType="reset"
              onClick={handleClear}
            >
              Limpar
            </Form.Button>
            <Form.Button
              buttonType="delete"
              onClick={handleDelete}
              confirmMessage="Deseja realmente deletar os projetos filtrados?"
            >
              Deletar Filtrados
            </Form.Button>
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
