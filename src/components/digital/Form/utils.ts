/**
 * Calcula width automático baseado em maxLength usando unidades CSS `ch`
 *
 * @param maxLength - Comprimento máximo do campo
 * @returns Width em formato `ch` ou undefined se maxLength não for fornecido
 */
export function widthFromMaxLength(maxLength?: number): string | undefined {
  if (!maxLength) return undefined;

  const MIN_CH = 6;
  const MAX_CH = 32;

  const ch = Math.min(Math.max(maxLength, MIN_CH), MAX_CH);
  return `${ch}ch`;
}

/**
 * Widths determinísticos para Date/Time Pickers
 */
export const PICKER_WIDTHS = {
  date: '20ch', // DD/MM/YYYY
  time: '14ch', // HH:mm
  datetime: '25ch', // DD/MM/YYYY HH:mm
} as const;
