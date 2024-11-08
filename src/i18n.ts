import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

i18n
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'hi', 'es'],
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
        loadPath: 'locales/{{lng}}.json',
    },
  });

export default i18n;
