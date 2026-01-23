'use client';

import { Form } from '@/components/digital/Form';
import View from '@/components/digital/View';
import { geartechApi, UserRequest } from '@/core/sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useFormRef } from '@/app/utils/hooks/useFormRef';
import { formSubmit } from '@/app/utils/formSubmit';
import { useMessage } from '@/app/utils/hooks/useMessage';
import { useState, useEffect } from 'react';
import { Button } from '@/components/digital/Button';

const { Header, Body } = View;

export default function UserForm() {
  const { t } = useTranslation();
  const formRef = useFormRef<UserRequest>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const isEdit = searchParams.get('edit') === 'true';
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(!!userId);
  const { showSuccess, showError } = useMessage();

  // Carrega dados do usuário se for edição
  useEffect(() => {
    if (userId) {
      const loadUser = async () => {
        try {
          setIsLoadingUser(true);
          const response = await geartechApi.user.getByIdUser(Number(userId));
          if (response.data && formRef.current) {
            formRef.current.reset(response.data);
          }
        } catch (error) {
          showError(error);
        } finally {
          setIsLoadingUser(false);
        }
      };
      loadUser();
    }
  }, [userId, showError, formRef]);

  const handleSaveUser = formSubmit(formRef, async (values) => {
    try {
      setIsLoading(true);
      if (userId) {
        // Editar
        await geartechApi.user.updateUser(Number(userId), values);
        showSuccess('user_updated_successfully');
      } else {
        // Criar
        await geartechApi.user.createUser(values);
        showSuccess('user_created_successfully');
      }
      router.push('/pages/auth/settings/users/UserList');
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <View>
      <Header
        title={t('users')}
        buttons={
          <>
            {isEdit && (
              <Button buttonType="success" onClick={handleSaveUser} disabled={isLoading || isLoadingUser || !isEdit}>
                {userId ? t('saveUser') : t('newUser')}
              </Button>
            )}
            <Button buttonType="back" onClick={() => router.back()} disabled={isLoading || isLoadingUser}>
              {t('back')}
            </Button>
          </>
        }
      />

      <Body>
        <Form<UserRequest> ref={formRef} disabled={!isEdit || isLoading || isLoadingUser}>
          <Form.Section title={t('users')} baseSize={8}>
            <Form.Input name="personalNumber" label={t('personalNumber')} baseSize={2} required />
            <Form.Input name="name" label={t('name')} baseSize={4} required />
            <Form.Input name="lastName" label={t('lastName')} baseSize={6} required />
          </Form.Section>

          <Form.Section title={t('contacts')} baseSize={6}>
            <Form.Input name="email" label={t('email')} baseSize={8} required />
            <Form.Input name="phone" label={t('phone')} baseSize={4} />
          </Form.Section>

          <Form.Section title={t('security')} baseSize={8}>
            <Form.Input name="password" label={t('password')} baseSize={2} required />
            <Form.DatePicker name="expiration" label={t('expirationDate')} baseSize={3} required />
            <Form.Checkbox name="resetPassword" label={t('resetPassword')} baseSize={3} />
            <Form.Switch name="active" label={t('active')} baseSize={3} />
          </Form.Section>
        </Form>
      </Body>
    </View>
  );
}
