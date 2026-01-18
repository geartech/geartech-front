import { useRef } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormHandle } from '@/components/digital/Form/Form';

export function useFormRef<T extends FieldValues>() {
  return useRef<FormHandle<T>>(null);
}
