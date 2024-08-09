import { languages } from '../i18n/ui';

const LanguageSelector = () => (
	<nav className="flex flex-col gap-2">
		<ul className="flex gap-4">
			{Object.entries(languages).map(([lang, label]) => (
				<li key={lang}>
					<a
						href={`/${lang}`}
						className="flex items-center gap-2 text-blue-600 hover:underline transition-colors duration-200"
					>
						<img src={`/${lang}-icon.svg`} alt={label} className="w-6 h-6" />
					</a>
				</li>
			))}
		</ul>
	</nav>
);

export default LanguageSelector;
