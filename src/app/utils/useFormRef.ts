import { useRef } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

export function useFormRef<T extends FieldValues>() {
  return useRef<UseFormReturn<T>>(null);
}
