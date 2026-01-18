import { FieldValues } from 'react-hook-form';
import { FormHandle } from '@/components/digital/Form/Form';

/**
 * formSubmit genérico com suporte a argumentos extras.
 *
 * @example
 * // Uso simples
 * const handleSave = formSubmit(formRef, async (values) => {
 *   await api.save(values);
 * });
 *
 * @example
 * // Com argumentos extras
 * const handleSearch = formSubmit(formRef, async (values, pageNum, pageSize) => {
 *   await api.search({ ...values, pageNum, pageSize });
 * });
 * handleSearch(1, 10);
 */
export const formSubmit = <T extends FieldValues, Args extends unknown[] = []>(
  formRef: React.RefObject<FormHandle<T> | null>,
  callback: (values: T, ...args: Args) => Promise<void>
) => {
  return async (...args: Args) => {
    const form = formRef.current;
    if (!form) return;

    await form.handleSubmit(async (values) => {
      await callback(values, ...args);
    })();
  };
};
