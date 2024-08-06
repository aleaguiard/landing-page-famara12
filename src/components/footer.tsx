import Logo from '../icons/logo';

const Footer = () => {
	return (
		<footer className="mt-[135px] w-full">
			<div className="w-full max-w-[1200px] px-12 xl:px-0 mx-auto pb-[135px]">
				<div className="flex justify-center mb-8">
					<a href="/" className="">
						<Logo />
					</a>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="col-span-1 flex flex-col gap-4">
						<h5 className="text-primary-200 font-dm text-[22px] lg:text-[25px] leading-loose">
							Home
						</h5>
						<div className="flex flex-col gap-6">
							<a
								href="/properties"
								className="tracking-tight text-base lg:text-[22px] lg:leading-[33px] font-jost text-text-gray"
							>
								Properties
							</a>
							<a
								href="/booking"
								className="tracking-tight text-base lg:text-[22px] lg:leading-[33px] font-jost text-text-gray"
							>
								Booking
							</a>
							<a
								href="/contact"
								className="tracking-tight text-base lg:text-[22px] lg:leading-[33px] font-jost text-text-gray"
							>
								Contact Us
							</a>
						</div>
					</div>
					<div className="col-span-1 flex flex-col gap-4 justify-end items-start md:justify-end md:items-end">
						<h5 className="text-primary-200 font-dm text-[22px] lg:text-[25px] leading-loose">
							Contact
						</h5>
						<div className="flex flex-col gap-6 items-start md:items-end">
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
			</div>
		</footer>
	);
};

export default Footer;
