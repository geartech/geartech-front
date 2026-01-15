'use client';

import { Button } from '@/components/digital/Button';
import { FormHandle } from '@/components/digital/Form/Form';
import { Form } from '@/components/digital/Form';
import View, { Filter } from '@/components/digital/View';
import { ProjectRequest } from '@/core/sdk';
import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const { Header, Body } = View;

export default function ProjectForm() {
  const { t } = useTranslation();
  const formRef = useRef<FormHandle<ProjectRequest>>(null);
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
        <Filter>
          <Form<ProjectRequest> ref={formRef}>
            <Grid container spacing={1}>
              <Grid size={3}>
                <Form.DatePicker name="startDate" label="startDate" required />
              </Grid>
              <Grid size={3}>
                <Form.DateTimePicker name="endDate" label="endDate" />
              </Grid>
              <Grid size={6}>
                <Form.Input
                  name="name"
                  label="projectName"
                  placeholder="typeToFilter"
                  maxLength={150}
                  loading={false}
                  required
                />
              </Grid>
            </Grid>
          </Form>
        </Filter>
      </Body>
    </View>
  );
}
