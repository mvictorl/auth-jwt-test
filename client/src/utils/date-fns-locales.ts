import { Locale } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { SupportedLocales } from '../store/slices/local-slice'

export const getDateFnfLocale = (loc: SupportedLocales): Locale => {
	switch (loc) {
		case 'ruRU':
			return ru
		default:
			return enUS
	}
}
