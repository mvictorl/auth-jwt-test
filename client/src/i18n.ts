import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backed from 'i18next-http-backend'

// import translationEN from './locales/en/common.json'
// import translationRU from './locales/ru/common.json'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
// const resources = {
// 	en: { translation: translationEN },
// 	ru: { translation: translationRU },
// }

i18n
	.use(Backed)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		debug: true,
		// resources,
		lng: 'en',
		// language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
		react: {
			useSuspense: true,
		},
	})

export default i18n
