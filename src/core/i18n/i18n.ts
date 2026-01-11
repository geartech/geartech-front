import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './index';

// Configuração básica do i18n

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt', // idioma padrão
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react já faz escaping
  },
  // Mostra a chave caso não encontre tradução
  returnNull: false,
  returnEmptyString: false,
  missingKeyHandler: function (lng, ns, key) {
    return key;
  },
  parseMissingKeyHandler: function (key) {
    return `{${key}}`;
  },
});

export default i18n;
