import labelsEn from './english/labels.json';
import messagesEn from './english/messages.json';
import exceptionsEn from './english/exceptions.json';
import enumsEn from './english/enums.json';

import labelsPt from './portuguese/labels.json';
import messagesPt from './portuguese/messages.json';
import exceptionsPt from './portuguese/exceptions.json';
import enumsPt from './portuguese/enums.json';

const en = {
  ...labelsEn,
  ...messagesEn,
  ...exceptionsEn,
  ...enumsEn,
};

const pt = {
  ...labelsPt,
  ...messagesPt,
  ...exceptionsPt,
  ...enumsPt,
};

export const resources = {
  en: { translation: en },
  pt: { translation: pt },
};
