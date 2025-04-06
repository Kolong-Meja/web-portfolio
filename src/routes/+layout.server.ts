import { defaultLocale, loadTranslations, locales, translations } from '$lib/translations';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ url, cookies }) => {
	const { pathname } = url;

	let locale = (cookies.get('lang') || '').toLowerCase();

	const supportedLocales = locales.get().map((l) => l.toLowerCase());

	if (!supportedLocales.includes(locale)) {
		locale = defaultLocale;
	}

	await loadTranslations(locale, pathname);

	return {
		i18n: { locale, route: pathname },
		translations: translations.get()
	};
};
