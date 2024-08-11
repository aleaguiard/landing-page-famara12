import { ui } from '../i18n/ui';

export interface LayoutProps {
	title: string;
}

export interface Property {
	title: string;
	description: string;
	buttonText: string;
	images: string[];
}

export interface ImageProps {
	src: string;
	alt: string;
}

export interface NavComponentProps {
	lang: keyof typeof ui;
	currentPath: string;
}

export interface FooterProps {
	lang: keyof typeof ui;
}

export interface LanguageSelectorProps {
	loading?: 'lazy' | 'eager';
}
