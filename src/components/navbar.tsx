import { useState } from 'react';
import Logo from '../icons/logo';
import { motion } from 'framer-motion';
import useMediaQuery from '../utils/useMediaQuery';
import { ui } from '../i18n/ui';
import LanguagePicker from './language-picker';
import { useTranslatedPath } from '../i18n/utils';

interface NavComponentProps {
	lang: keyof typeof ui;
}

const Navbar = ({ lang = 'en' }: NavComponentProps) => {
	const translatePath = useTranslatedPath(lang);
	const [toggled, setToggled] = useState(false);
	const matches = useMediaQuery('(min-width: 1280px)');

	const linkStyle = 'text-xl leading-6 font-jost text-primary-200';

	return (
		<div className="max-w-[1200px] px-12 xl:px-0 m-auto w-full py-4 flex justify-between items-center">
			<Logo />
			{/* Nav List for Desktop */}
			{matches && (
				<nav className="flex flex-row gap-6">
					<a href={translatePath('/')} className={linkStyle}>
						{ui[lang].nav.home}
					</a>
					<a href={translatePath('/properties')} className={linkStyle}>
						{ui[lang].nav.properties}
					</a>
					<a href={translatePath('/booking')} className={linkStyle}>
						{ui[lang].nav.booking}
					</a>
					<a href={translatePath('/contact')} className={linkStyle}>
						{ui[lang].nav.contact}
					</a>
					<LanguagePicker />
				</nav>
			)}
			{!matches && (
				<div onClick={() => setToggled(!toggled)} className="space-y-1 cursor-pointer">
					<motion.span
						animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
						className="block h-0.5 w-8 bg-black"
					></motion.span>
					<motion.span
						animate={{ width: toggled ? 0 : 24 }}
						className="block h-0.5 w-6 bg-black"
					></motion.span>
					<motion.span
						animate={{
							rotateZ: toggled ? -45 : 0,
							y: toggled ? -8 : 0,
							width: toggled ? 32 : 16,
						}}
						className="block h-0.5 w-4 bg-black"
					></motion.span>
				</div>
			)}
			{toggled && !matches && (
				<motion.nav
					initial={{ opacity: 0, x: 25 }}
					animate={{ opacity: 1, x: 0 }}
					className="flex flex-col fixed h-screen bg-white w-[75%] md:w-[90%] text-black bottom-0 left-0 gap-6 items-center justify-center"
				>
					<a href={`/${lang}`} className={linkStyle}>
						{ui[lang].nav.home}
					</a>
					<a href={`/${lang}/properties`} className={linkStyle}>
						{ui[lang].nav.properties}
					</a>
					<a href={`/${lang}/booking`} className={linkStyle}>
						{ui[lang].nav.booking}
					</a>
					<a href={`/${lang}/contact`} className={linkStyle}>
						{ui[lang].nav.contact}
					</a>
					<LanguagePicker />
				</motion.nav>
			)}
		</div>
	);
};

export default Navbar;
