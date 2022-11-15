import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import langEn from './lang.en.json';
import langKo from './lang.ko.json';

const resources = {
	en: {
		translation: langEn
	},
	ko: {
		translation: langKo
	}
};

i18n
	// .use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		lng: 'ko',
		fallbackLng: 'en',
		keySeparator: false,
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
