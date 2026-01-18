'use client';

import { Button } from '@/components/digital/Button';
import { Form } from '@/components/digital/Form';
import View from '@/components/digital/View';
import { ProjectRequest } from '@/core/sdk';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useFormRef } from '@/app/utils/hooks/useFormRef';

const { Header, Body } = View;

export default function ProjectForm() {
  const { t } = useTranslation();
  const formRef = useFormRef<ProjectRequest>();
  const router = useRouter();

  const handleSaveProject = async () => {
    // Validar formulário e mostrar erros
    await formRef.current?.handleSubmit(async (values) => {
      console.log('Salvar projeto', values);
      // Lógica para salvar o projeto aqui...

      // Após salvar, navegar de volta para a lista de projetos
      router.push('/pages/auth/workspace/project/ProjectList');
    })();
  };

  return (
    <View>
      <Header
        title="Projetos"
        buttons={
          <>
            <Button buttonType="button" onClick={handleSaveProject}>
              {t('newProject')}
            </Button>
          </>
        }
      />

      <Body>
        <Form<ProjectRequest> ref={formRef}>
          <Form.Section title="Projeto" baseSize={8}>
            <Form.Input name="name" label="Nome do projeto" baseSize={12} required />
          </Form.Section>

          <Form.Section title="Vigência" layout="inline" baseSize={12}>
            <Form.TimePicker name="startDate" required compact />
            <Form.DatePicker name="endDate" label="Data de término" compact />
            <Form.DateTimePicker name="finishDateTime" label="Data e hora de término" compact />

            <Form.Select
              options={[
                { value: 'A', label: 'Option A' },
                { value: 'B', label: 'Option B' },
                { value: 'C', label: 'Option C' },
              ]}
              name="priority"
              label="Prioridade"
              baseSize={6}
            />
            <Form.Switch name="isActive" label="Projeto ativo" baseSize={4} />
            <Form.Checkbox name="isPublic" label="Projeto público" baseSize={4} />
          </Form.Section>
        </Form>
      </Body>
    </View>
  );
}
