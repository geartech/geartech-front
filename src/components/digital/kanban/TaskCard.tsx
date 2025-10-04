'use client';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Button, Card, CardContent, Typography } from '@mui/material';
import type { Task } from './types';
import LaunchIcon from '@mui/icons-material/Launch';
import React from 'react';
import FormDrawer from '../modal/FormDrawer';
import View from '../View';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const [open, setOpen] = React.useState(false);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : 1,
    cursor: 'grab',
    zIndex: isDragging ? 1000 : 'auto',
    position: 'relative',
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{ mb: 1.5 }}
      >
        <CardContent sx={{ py: 1.25, '&:last-child': { pb: 1.25 } }}>
          <Typography variant="body2">{task.title}</Typography>
          <LaunchIcon
            fontSize="medium"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'action.active',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
            role="button"
          />
        </CardContent>
      </Card>
      <FormDrawer
        open={open}
        title={<Typography variant="h5">{task.title}</Typography>}
        subtitle={`Projeto: PRJ-001 · Simulador Frete | Tarefa 01113`}
        onClose={(reason) => {
          console.log('Drawer fechado por:', reason);
          setOpen(false);
        }}
        anchor="right"
        width="80%"
        appearance="glass"
        showCloseIcon
        disableBackdropClose // não fecha no clique fora
        // disableEscapeKeyDown // descomente se não quiser fechar com ESC
      >
        <View isDrawer>
          <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
            {/* MVP: Dados genéricos de um card Kanban com anexo fixo */}
            <Stack spacing={2}>
              <TextField
                label="Ordem de Serviço"
                value="OS-001113 - Cadastro de Usuários"
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Responsável"
                value="Leandro Marques"
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <Stack
                direction="row"
                spacing={2}
              >
                <TextField
                  label="Horas Planejadas"
                  value="2"
                />
                <TextField
                  label="Horas Realizadas"
                  value="0"
                />
                <TextField
                  label="Horas Restantes"
                  value="2"
                />
              </Stack>
              <TextField
                label="Observações"
                value="Atividade realizada automaticamente pelo sistema."
                multiline
                minRows={2}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              {/* Anexo genérico já presente */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 0.5 }}
                >
                  Anexos
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AttachFileIcon />}
                  href="/Documento%20de%20Escopo.docx"
                  target="_blank"
                  rel="noopener"
                  sx={{ textTransform: 'none' }}
                >
                  Documento de Escopo.docx
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              <TextField
                label="Resposta"
                placeholder="Digite sua resposta..."
                multiline
                minRows={2}
                fullWidth
                value={
                  'Documento docx gerado, prompts de entrada 1800 tokens, tokens de saida 1643, total 3443 tokens.\nTempo de processamento 19 segundos.'
                }
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 0.5 }}
                >
                  Anexar documento de saída
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AttachFileIcon />}
                  href="/Documento%20de%20Especificação.docx"
                  target="_blank"
                  rel="noopener"
                  sx={{ textTransform: 'none' }}
                >
                  Documento Especificação
                  <input
                    type="file"
                    hidden
                  />
                </Button>
              </Box>
            </Stack>
            <Divider sx={{ my: 2 }} />
          </Box>
        </View>
      </FormDrawer>
    </>
  );
}
