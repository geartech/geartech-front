'use client';

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Divider,
  Stack,
  Link as MUILink,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export type Project = {
  id: number;
  codigo: string;
  nome: string;
  backlog: number;
  emAndamento: number;
  concluidos: number;
  idSprintAtual: number;
  sprintAtual: string;
  progresso: number;
  status: 'Dentro do Prazo' | 'Em Risco' | 'Atrasado';
};

type ProjectCardProps = {
  projeto: Project;
  href_sprint?: string;
  href_projeto?: string;
};

export default function ProjectCard({ projeto, href_sprint, href_projeto }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
        height: 200,
        transition: 'width 0.4s ease, height 0.4s ease',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease, scale 0.3s ease',
          transform: flipped ? 'rotateY(180deg) scale(1.05)' : 'rotateY(0deg) scale(1)',
        }}
      >
        {/* Frente */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: 3,
            boxShadow: 4,
            p: 1,
          }}
        >
          <CardHeader
            sx={{ p: 0, mb: 1 }}
            title={
              <Stack
                direction="row"
                spacing={1}
                alignItems="flex-start"
                justifyContent={'space-between'}
              >
                <MUILink
                  component={Link}
                  href={href_projeto || '#'}
                  underline="hover"
                  color="primary"
                >
                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                  >
                    {projeto.codigo} - {projeto.nome}
                  </Typography>
                </MUILink>
                <SwapHorizIcon
                  sx={{ fontSize: 20, cursor: 'pointer' }}
                  onClick={() => setFlipped(!flipped)}
                />
              </Stack>
            }
            subheader={
              <MUILink
                component={Link}
                href={href_sprint || '#'}
                underline="hover"
                color="secondary"
              >
                <Typography
                  fontSize={14}
                  color="text.secondary"
                >
                  Sprint Atual: {projeto.sprintAtual}
                </Typography>
              </MUILink>
            }
          />

          <Divider sx={{ mt: 0, mb: 1.5 }} />
          <Typography
            variant="body2"
            gutterBottom
          >
            Progresso:
          </Typography>
          <LinearProgress
            variant="determinate"
            value={projeto.progresso}
            sx={{ height: 8, borderRadius: 5 }}
          />
          <Typography
            variant="caption"
            sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
          >
            {projeto.progresso}%
          </Typography>

          <Box
            display="flex"
            justifyContent="flex-end"
            mt={1}
          >
            <Chip
              label={projeto.status}
              color={
                projeto.status === 'Dentro do Prazo' ? 'success' : projeto.status === 'Em Risco' ? 'warning' : 'error'
              }
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
        </Card>

        {/* Verso */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 3,
            boxShadow: 4,
            p: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent={'space-between'}
          >
            <Typography
              fontSize={18}
              fontWeight="bold"
            >
              Detalhes do Projeto
            </Typography>
            <SwapHorizIcon
              sx={{ fontSize: 20, cursor: 'pointer' }}
              onClick={() => setFlipped(!flipped)}
            />
          </Stack>
          <Typography
            fontSize={14}
            color="text.secondary"
          >
            Status: {projeto.status}
          </Typography>

          <Divider sx={{ mt: 0.5 }} />
          <CardContent sx={{ width: '50%', p: 0, mt: 1 }}>
            <Stack
              direction="row"
              spacing={0.3}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Backlog:
              </Typography>
              <Typography variant="caption">{projeto.backlog}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={0.3}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Em andamento:
              </Typography>
              <Typography variant="caption">{projeto.emAndamento}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={0.3}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Concluídos:
              </Typography>
              <Typography variant="caption">{projeto.concluidos}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
