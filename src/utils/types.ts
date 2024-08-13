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

export interface BookingCalendarProps {
	lang: string;
}

export interface Reserva {
	title: string;
	start: string;
	end: string;
}

export interface BookingFormProps {
	lang: string;
	onAccommodationChange: (value: string) => void;
	checkInDate: Date | null;
	checkOutDate: Date | null;
}

export interface Button {
	text?: string;
	type?: 'submit' | 'button';
	onClick?: () => void;
	to?: string;
	className?: string;
}

export interface ButtonProps {
	text: string;
	type?: 'submit' | 'button';
	onClick?: () => void;
	to?: string;
}

export interface ContactFormProps {
	lang: keyof typeof ui;
}

export interface FloatingLabelInputProps {
	id: string;
	label: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}
