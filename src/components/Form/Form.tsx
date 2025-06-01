import React from 'react';
import { useForm, FormProvider, SubmitHandler, FieldValues } from 'react-hook-form';

import { DefaultValues } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
};

function FormComponent<T extends FieldValues>({ defaultValues, onSubmit, children }: FormProps<T>) {
  const methods = useForm<T>({ defaultValues });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default FormComponent;
