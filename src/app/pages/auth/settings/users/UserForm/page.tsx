'use client';

import { Button } from '@/components/digital/Button';
import { Form } from '@/components/digital/Form';
import View from '@/components/digital/View';
import { geartechApi, UserRequest } from '@/core/sdk';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useFormRef } from '@/app/utils/hooks/useFormRef';
import { formSubmit } from '@/app/utils/formSubmit';
import { useSnackbar } from '@/app/utils/hooks/useSnackbar';

const { Header, Body } = View;

export default function UserForm() {
  const { t } = useTranslation();
  const formRef = useFormRef<UserRequest>();
  const router = useRouter();
  const { showSuccess, showError } = useSnackbar();

  const handleSaveUser = formSubmit(formRef, async (values) => {
    try {
      await geartechApi.user.createUser(values);
      showSuccess('user_created_successfully');
      router.push('/pages/auth/settings/users/UserList');
    } catch (error) {
      showError(error);
      return;
    }
  });

  return (
    <View>
      <Header
        title={t('users')}
        buttons={
          <>
            <Button buttonType="success" onClick={handleSaveUser}>
              {t('newUser')}
            </Button>
            <Button buttonType="back" onClick={() => router.back()}>
              {t('back')}
            </Button>
          </>
        }
      />

      <Body>
        <Form<UserRequest> ref={formRef}>
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
