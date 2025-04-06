import { addTranslations, setLocale, setRoute } from '$lib/translations';
import type { Load } from '@sveltejs/kit';

export const prerender = true;

export const load: Load = async ({ data }) => {
	if (!data) {
		throw new Error('Something error happen...');
	}

	const { i18n, translations } = data;
	const { locale, route } = i18n;

	addTranslations(translations);

	await setRoute(route);
	await setLocale(locale);

	return i18n;
};
