'use client';

import View from '@/components/digital/View';
import ProjectCard, { Project } from '@/components/digital/ProjectCard';
import Grid from '@mui/material/Grid';

const { Header, Body } = View;

const projetoCard: Project[] = [
  {
    id: 1,
    codigo: 'PRJ-001',
    nome: 'Projeto Simulador Frete',
    backlog: 6,
    emAndamento: 2,
    concluidos: 1,
    idSprintAtual: 1,
    sprintAtual: 'Sprint 1',
    progresso: 18,
    status: 'Dentro do Prazo',
  },
  {
    id: 2,
    codigo: 'PRJ-002',
    nome: 'Projeto Modelo N2',
    backlog: 6,
    emAndamento: 2,
    concluidos: 1,
    idSprintAtual: 1,
    sprintAtual: 'Sprint 1',
    progresso: 9,
    status: 'Em Risco',
  },
  {
    id: 3,
    codigo: 'PRJ-003',
    nome: 'Projeto Modelo N3',
    backlog: 6,
    emAndamento: 2,
    concluidos: 1,
    idSprintAtual: 1,
    sprintAtual: 'Sprint 1',
    progresso: 45,
    status: 'Atrasado',
  },
];

export default function ProjectDashboard() {
  return (
    <View>
      <Header title="DashBoard - Projetos" />
      <Body>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
        >
          {projetoCard.map((projeto, index) => (
            <Grid
              key={index}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              display={'flex'}
              justifyContent="flex-start"
            >
              <ProjectCard
                key={index}
                projeto={projeto}
                href_projeto={`/pages/auth/settings/project/${projeto.id}`}
                href_sprint={`/pages/auth/sprint/SprintBoard`}
              />
            </Grid>
          ))}
        </Grid>
      </Body>
    </View>
  );
}
