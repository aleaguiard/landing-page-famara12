import { ui, defaultLang } from '../i18n/ui';
import Logo from '../icons/logo';
import LanguagePicker from './language-picker';

interface FooterProps {
	lang: keyof typeof ui;
}

const Footer = ({ lang }: FooterProps) => {
	const currentLang = lang in ui ? lang : defaultLang;

	return (
		<footer className="mt-[80px] w-full">
			<div className="w-full max-w-[1200px] px-12 xl:px-0 mx-auto pb-[80px]">
				<div className="flex justify-center mb-8">
					<a href={`/${currentLang}`} className="">
						<Logo />
					</a>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="col-span-1 flex flex-col gap-4">
						<h5 className="text-primary-200 font-dm text-[22px] lg:text-[25px] leading-loose">
							<a href={`/${currentLang}`} className="text-primary-200">
								{ui[currentLang].nav.home}
							</a>
						</h5>
						<div className="flex flex-col gap-2">
							<a
								href={`/${currentLang}/properties`}
								className="tracking-tight text-base lg:text-[22px] lg:leading-[33px] font-jost text-text-gray"
							>
								{ui[currentLang].nav.properties}
							</a>
							<a
								href={`/${currentLang}/booking`}
								className="tracking-tight text-base lg:text-[22px] lg:leading-[33px] font-jost text-text-gray"
							>
								{ui[currentLang].nav.booking}
							</a>
							<a
								href={`/${currentLang}/contact`}
								className="tracking-tight text-base lg:text-[22px] lg:leading-[33px] font-jost text-text-gray"
							>
								{ui[currentLang].footer.contact}
							</a>
						</div>
					</div>

					<div className="col-span-1 flex flex-col gap-4 justify-end items-start md:justify-end md:items-end">
						<h5 className="text-primary-200 font-dm text-[22px] lg:text-[25px] leading-loose">
							{ui[currentLang].footer.contact}
						</h5>
						<div className="flex flex-col gap-2 items-start md:items-end">
							<p className="tracking-tight text-base lg:text-[22px] lg:leading-[33px] font-jost text-text-gray">
								Calle Doradillas 10, Famara, Lanzarote
							</p>
							<p className="tracking-tight text-base lg:text-[22px] lg:leading-[33px] font-jost text-text-gray">
								famarahouse12@gmail.com
							</p>
							<p className="tracking-tight text-base lg:text-[22px] lg:leading-[33px] font-jost text-text-gray">
								(+34) 616 05 61 86
							</p>
						</div>
					</div>
				</div>
				<div className="flex justify-center mt-6">
					<LanguagePicker />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
