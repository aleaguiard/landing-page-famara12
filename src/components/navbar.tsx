import { useState } from 'react';
import { motion } from 'framer-motion';
import useMediaQuery from '../utils/useMediaQuery';
import { ui } from '../i18n/ui';
import LanguagePicker from './language-picker';
import { useTranslatedPath } from '../i18n/utils';
import Logo from '../icons/logo';
import type { NavComponentProps } from '../utils/types';

const Navbar = ({ lang, currentPath }: NavComponentProps) => {
	const translatePath = useTranslatedPath(lang);
	const [toggled, setToggled] = useState(false);
	const matches = useMediaQuery('(min-width: 1280px)');

	const isHomePage =
		currentPath === `/${lang}` || currentPath === '/' || currentPath === `/${lang}/`;

	const linkStyle =
		'text-xl leading-6 font-jost text-primary-200 relative pb-1 transition duration-300 ease-in-out';
	const hoverStyle =
		'hover:after:content-[""] hover:after:absolute hover:after:w-full hover:after:h-[2px] hover:after:bg-primary-200 hover:after:left-0 hover:after:bottom-0';
	const activeLinkStyle =
		'after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-primary-200 after:left-0 after:bottom-0';

	const bgStyle = isHomePage ? 'bg-transparent' : 'bg-white bg-opacity-75 shadow-lg';

	return (
		<div className={`fixed top-0 left-0 w-full z-40 bg-white`}>
			<div
				className={`fixed ${isHomePage ? 'top-5' : 'top-0'} left-0 w-full z-40 ${bgStyle}`}
			>
				<div className="max-w-[1200px] px-10 xl:px-0 m-auto w-full py-1 flex items-center">
					{!isHomePage && (
						<a href={translatePath('/').replace(/\/$/, '')}>
							<Logo />
						</a>
					)}

					{matches && !isHomePage && (
						<nav className="flex flex-row gap-6 ml-auto">
							<a
								href={translatePath('/').replace(/\/$/, '')}
								className={`${linkStyle} ${hoverStyle} ${
									currentPath === translatePath('/').replace(/\/$/, '')
										? activeLinkStyle
										: ''
								}`}
							>
								{ui[lang].nav.home}
							</a>
							<a
								href={translatePath('/properties').replace(/\/$/, '')}
								className={`${linkStyle} ${hoverStyle} ${
									currentPath === translatePath('/properties').replace(/\/$/, '')
										? activeLinkStyle
										: ''
								}`}
							>
								{ui[lang].nav.properties}
							</a>
							<a
								href={translatePath('/booking').replace(/\/$/, '')}
								className={`${linkStyle} ${hoverStyle} ${
									currentPath === translatePath('/booking').replace(/\/$/, '')
										? activeLinkStyle
										: ''
								}`}
							>
								{ui[lang].nav.booking}
							</a>
							<a
								href={translatePath('/contact').replace(/\/$/, '')}
								className={`${linkStyle} ${hoverStyle} ${
									currentPath === translatePath('/contact').replace(/\/$/, '')
										? activeLinkStyle
										: ''
								}`}
							>
								{ui[lang].nav.contact}
							</a>
							<LanguagePicker />
						</nav>
					)}

					{(!matches || isHomePage) && (
						<div
							onClick={() => setToggled(!toggled)}
							className="space-y-1 cursor-pointer ml-auto z-50"
						>
							<motion.span
								animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
								className={`block h-0.5 w-8 ${
									toggled
										? 'bg-gray-500'
										: isHomePage
										? 'bg-white'
										: 'bg-gray-500'
								} shadow-md`}
							></motion.span>
							<motion.span
								animate={{ width: toggled ? 0 : 24 }}
								className={`block h-0.5 w-6 ${
									toggled
										? 'bg-gray-500'
										: isHomePage
										? 'bg-white'
										: 'bg-gray-500'
								} shadow-md`}
							></motion.span>
							<motion.span
								animate={{
									rotateZ: toggled ? -45 : 0,
									y: toggled ? -8 : 0,
									width: toggled ? 32 : 16,
								}}
								className={`block h-0.5 w-4 ${
									toggled
										? 'bg-gray-500'
										: isHomePage
										? 'bg-white'
										: 'bg-gray-500'
								} shadow-md`}
							></motion.span>
						</div>
					)}

					{toggled && (!matches || isHomePage) && (
						<motion.nav
							initial={{ opacity: 0, x: 25 }}
							animate={{ opacity: 1, x: 0 }}
							className="flex flex-col fixed h-screen w-screen bg-white text-black top-0 left-0 gap-6 items-center justify-center z-40"
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
			</div>
		</div>
	);
};

export default Navbar;
