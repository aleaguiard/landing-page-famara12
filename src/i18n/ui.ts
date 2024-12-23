import englishTranslations from '../data/en/ui';
import spanishTranslations from '../data/es/ui';
import italianTranslations from '../data/ita/ui';

export const languages = {
	es: 'Español',
	en: 'English',
	ita: 'Italiano',
};

export const defaultLang = 'es';
export const showDefaultLang = true;

export const ui: UiTranslations = {
	es: spanishTranslations.es,
	en: englishTranslations.en,
	ita: italianTranslations.ita,
};
