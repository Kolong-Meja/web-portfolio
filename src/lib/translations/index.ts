import type { Config } from 'sveltekit-i18n';
import lang from './lang.json';
import I18n from 'sveltekit-i18n';

export const defaultLocale = 'en';

export const config: Config = {
	fallbackLocale: 'en',
	translations: {
		en: { lang },
		id: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'navbar',
			loader: async () => (await import('./en/navbar.json')).default
		},
		{
			locale: 'en',
			key: 'about',
			loader: async () => (await import('./en/about.json')).default
		},
		{
			locale: 'id',
			key: 'navbar',
			loader: async () => (await import('./id/navbar.json')).default
		},
		{
			locale: 'id',
			key: 'about',
			loader: async () => (await import('./id/about.json')).default
		}
	]
};

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new I18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
