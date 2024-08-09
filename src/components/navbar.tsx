import { useState } from 'react';
import Logo from '../icons/logo';
import { motion } from 'framer-motion';
import useMediaQuery from '../utils/useMediaQuery';
import { ui } from '../i18n/ui';
import LanguagePicker from './language-picker';
import { useTranslatedPath } from '../i18n/utils';

interface NavComponentProps {
	lang: keyof typeof ui;
	currentPath: string;
}

const Navbar = ({ lang, currentPath }: NavComponentProps) => {
	const translatePath = useTranslatedPath(lang);
	const [toggled, setToggled] = useState(false);
	const matches = useMediaQuery('(min-width: 1280px)');

	const linkStyle =
		'text-xl leading-6 font-jost text-primary-200 relative pb-1 transition duration-300 ease-in-out';
	const hoverStyle =
		'hover:after:content-[""] hover:after:absolute hover:after:w-full hover:after:h-[2px] hover:after:bg-primary-200 hover:after:left-0 hover:after:bottom-0';
	const activeLinkStyle =
		'after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-primary-200 after:left-0 after:bottom-0';

	return (
		<div className="max-w-[1200px] px-12 xl:px-0 m-auto w-full py-4 flex justify-between items-center">
			<Logo />
			{/* Nav List for Desktop */}
			{matches && (
				<nav className="flex flex-row gap-6">
					<a
						href={translatePath('/')}
						className={`${linkStyle} ${hoverStyle} ${
							currentPath === translatePath('/') ? activeLinkStyle : ''
						}`} // Aplicar estilo activo
					>
						{ui[lang].nav.home}
					</a>
					<a
						href={translatePath('/properties')}
						className={`${linkStyle} ${hoverStyle} ${
							currentPath === translatePath('/properties') ? activeLinkStyle : ''
						}`}
					>
						{ui[lang].nav.properties}
					</a>
					<a
						href={translatePath('/booking')}
						className={`${linkStyle} ${hoverStyle} ${
							currentPath === translatePath('/booking') ? activeLinkStyle : ''
						}`}
					>
						{ui[lang].nav.booking}
					</a>
					<a
						href={translatePath('/contact')}
						className={`${linkStyle} ${hoverStyle} ${
							currentPath === translatePath('/contact') ? activeLinkStyle : ''
						}`}
					>
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
					<a
						href={`/${lang}`}
						className={`${linkStyle} ${hoverStyle} ${
							currentPath === `/${lang}` ? activeLinkStyle : ''
						}`}
					>
						{ui[lang].nav.home}
					</a>
					<a
						href={`/${lang}/properties`}
						className={`${linkStyle} ${hoverStyle} ${
							currentPath === `/${lang}/properties` ? activeLinkStyle : ''
						}`}
					>
						{ui[lang].nav.properties}
					</a>
					<a
						href={`/${lang}/booking`}
						className={`${linkStyle} ${hoverStyle} ${
							currentPath === `/${lang}/booking` ? activeLinkStyle : ''
						}`}
					>
						{ui[lang].nav.booking}
					</a>
					<a
						href={`/${lang}/contact`}
						className={`${linkStyle} ${hoverStyle} ${
							currentPath === `/${lang}/contact` ? activeLinkStyle : ''
						}`}
					>
						{ui[lang].nav.contact}
					</a>
					<LanguagePicker />
				</motion.nav>
			)}
		</div>
	);
};

export default Navbar;
