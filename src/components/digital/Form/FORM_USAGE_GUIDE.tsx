/**
 * EXEMPLO DE USO CORRETO DO FORM COM PICKERS
 *
 * Este arquivo demonstra como usar os Date/Time Pickers corretamente
 */

import { Form } from '@/components/digital/Form';
import { Grid } from '@mui/material';
import { Dayjs } from 'dayjs';

// Interface correta para formulário com campos de data
interface SearchFiltersDTO {
  projectName: string;
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  startTime?: Dayjs | null;
  createdAt?: Dayjs | null;
}

/**
 * ❌ USO INCORRETO - Usar pickers para campos string
 */
export function IncorrectExample() {
  return (
    <Form<{ name: string }> onSubmit={(data) => console.log(data)}>
      {/* ❌ ERRADO: FormDatePicker com campo string */}
      <Form.DatePicker name="name" label="Nome do Projeto" />
    </Form>
  );
}

/**
 * ✅ USO CORRETO - Usar pickers para campos de data/time
 */
export function CorrectExample() {
  const handleSearch = async (data: SearchFiltersDTO) => {
    console.log('Buscando com filtros:', data);
    // data.startDate será um objeto Dayjs ou null
    // data.projectName será uma string
  };

  return (
    <Form<SearchFiltersDTO> onSubmit={handleSearch}>
      {/* ✅ CORRETO: FormInput para strings */}
      <Grid size={6}>
        <Form.Input name="projectName" label="Nome do Projeto" placeholder="Digite o nome..." maxLength={150} />
      </Grid>

      {/* ✅ CORRETO: FormDatePicker para datas */}
      <Grid size={3}>
        <Form.DatePicker name="startDate" label="Data de Início" />
      </Grid>

      {/* ✅ CORRETO: FormDatePicker para datas */}
      <Grid size={3}>
        <Form.DatePicker name="endDate" label="Data de Término" />
      </Grid>

      {/* ✅ CORRETO: FormTimePicker para horários */}
      <Grid size={6}>
        <Form.TimePicker name="startTime" label="Horário de Início" />
      </Grid>

      {/* ✅ CORRETO: FormDateTimePicker para data + hora */}
      <Grid size={6}>
        <Form.DateTimePicker name="createdAt" label="Data de Criação" />
      </Grid>

      <Form.Actions variant="search">
        <Form.Button buttonType="info">Buscar</Form.Button>
      </Form.Actions>
    </Form>
  );
}

/**
 * REGRAS IMPORTANTES
 *
 * 1. FormInput → para strings e números
 * 2. FormSelect → para enums/seleções
 * 3. FormDatePicker → para datas (valores Dayjs)
 * 4. FormTimePicker → para horários (valores Dayjs)
 * 5. FormDateTimePicker → para data + hora (valores Dayjs)
 *
 * OS PICKERS AGORA TÊM VALIDAÇÃO
 * - Se você passar um valor inválido (string, número, etc),
 *   ele será convertido para null automaticamente
 * - Isso evita erros como "value.isValid is not a function"
 */
