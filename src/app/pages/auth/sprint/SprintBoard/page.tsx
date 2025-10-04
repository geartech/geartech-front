'use client';

import KanbanGrid from '@/components/digital/kanban/KanbanGrid';
import type { Project } from '@/components/digital/kanban/types';
import View from '@/components/digital/View';

const { Header, Body } = View;

const initialProjects: Project[] = [
  {
    id: 1,
    code: 'PRJ-001',
    name: 'Simulador Frete',
    owner: 'Leandro',
    columns: {
      todo: [
        { id: 't1', title: 'Especificação' },
        { id: 't2', title: 'Criação do DDL' },
        { id: 't3', title: 'Desenv. Backend' },
        { id: 't4', title: 'Testes Unitários (BE)' },
        { id: 't5', title: 'Desenv. Frontend' },
        { id: 't6', title: 'Testes Unitários (FE)' },
        { id: 't7', title: 'Testes Integrados/E2E' },
        { id: 't8', title: 'Documentação' },
        { id: 't9', title: 'Revisão/PR' },
      ],
      doing: [],
      done: [],
    },
  },
  {
    id: 2,
    code: 'PRJ-002',
    name: 'Dashboard Logístico',
    owner: 'Equipe X',
    columns: {
      todo: [
        { id: 't10', title: 'Testes Unitários (BE)' },
        { id: 't11', title: 'Desenv. Frontend' },
        { id: 't12', title: 'Testes Unitários (FE)' },
        { id: 't13', title: 'Testes Integrados/E2E' },
        { id: 't14', title: 'Documentação' },
        { id: 't15', title: 'Revisão/PR' },
      ],
      doing: [{ id: 't19', title: 'Testes Unitários (BE)' }],
      done: [
        { id: 't16', title: 'Especificação' },
        { id: 't17', title: 'Criação do DDL' },
        { id: 't18', title: 'Desenv. Backend' },
      ],
    },
  },
];

export default function Page() {
  return (
    <View>
      <Header title="Sprint - 01/09/2025 - 07/09/2025" />
      <Body>
        <KanbanGrid
          initialProjects={initialProjects}
          onChange={(projects) => {
            // persistência opcional (Redux/API)
            console.log(projects);
          }}
        />
      </Body>
    </View>
  );
}
