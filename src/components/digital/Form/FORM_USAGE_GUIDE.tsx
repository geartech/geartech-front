/**
 * EXEMPLO DE USO CORRETO DO FORM COM PICKERS
 *
 * Este arquivo demonstra como usar os Date/Time Pickers corretamente
 */

import { Form } from '@/components/digital/Form';
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
    <Form<{ name: string }>
      onSubmit={(data) => console.log(data)}
    >
      {/* ❌ ERRADO: FormDatePicker com campo string */}
      <Form.DatePicker
        name="name"
        label="Nome do Projeto"
      />
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
      <Form.Input
        name="projectName"
        label="Nome do Projeto"
        placeholder="Digite o nome..."
        maxLength={150}
      />

      {/* ✅ CORRETO: FormDatePicker para datas */}
      <Form.DatePicker
        name="startDate"
        label="Data de Início"
      />

      {/* ✅ CORRETO: FormDatePicker para datas */}
      <Form.DatePicker
        name="endDate"
        label="Data de Término"
      />

      {/* ✅ CORRETO: FormTimePicker para horários */}
      <Form.TimePicker
        name="startTime"
        label="Horário de Início"
      />

      {/* ✅ CORRETO: FormDateTimePicker para data + hora */}
      <Form.DateTimePicker
        name="createdAt"
        label="Data de Criação"
      />

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
