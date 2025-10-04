'use client';

import View from '@/components/digital/View';
import SimpleGrid from '@/components/digital/Form/FormGrid';
import { geartechApi } from '@/core/sdk';
import { Button } from '@mui/material';

const { Header, Body } = View;

const data = [
  { id: 1, name: 'João', age: 28 },
  { id: 2, name: 'Maria', age: 34 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
  { id: 3, name: 'Carlos', age: 22 },
];

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'age', header: 'Idade' },
];

export default function ProjectList() {
  function handleList() {}

  return (
    <View>
      <Header title="Projetos" />
      <Body>
        
        <SimpleGrid
          columns={columns}
          data={data}
          crudRow
          onView={(row) => console.log('View', row)}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={async (row) => console.log('Delete', row)}
          footerActions={({ selected, selectMode, toggleSelectMode }) => {
            const ids = selected.map((s) => s.id);
            const temSelecao = ids.length > 0;

            return (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log('Novo')}
                >
                  Novo
                </Button>
                <Button
                  variant="outlined"
                  color={selectMode ? 'error' : 'inherit'}
                  onClick={() => {
                    if (!selectMode) {
                      // liga checkboxes
                      toggleSelectMode();
                    } else {
                      // já está ligado: se houver selecionados, loga os ids
                      if (temSelecao) console.log('Excluir ids:', ids);
                    }
                  }}
                  disabled={selectMode && !temSelecao}
                  sx={{ ml: 1 }}
                >
                  {selectMode ? 'Excluir Todos' : 'Exclusão Múltipla'}
                </Button>
              </>
            );
          }}
        />
      </Body>
    </View>
  );
}
