import React from 'react';
import BookingForm from './booking-form';
import { ui } from '../i18n/ui';

interface BookingCalendarProps {
	lang: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ lang }) => {
	return (
		<section className="px-8 xl:px-0 w-full mt-[40px] lg:mt-[40px] ">
			<div className="w-full lg:max-w-[1200px] p-12 mx-auto lg:px-[116px] lg:py-[40px] bg-primary-300 rounded-[70px]">
				<h2 className="font-dm tracking-wide text-center leading-[37px] lg:leading-[62.50px] text-[30px] lg:text-[40px] w-full capitalize lg:max-w-[75%] pb-2 mx-auto">
					{ui[lang].booking.calendarTitle}
				</h2>
				<p className="text-base md:text-[20px] text-center tracking-tight font-jost text-text-gray leading-[33px] lg:max-w-[60%] mx-auto">
					{ui[lang].booking.selectDates}
				</p>
				<BookingForm lang={lang} />
				<small className="text-text-gray text-xs mt-4 block">
					{ui[lang].booking.confirmationNote}
				</small>
			</div>
		</section>
	);
};

export default BookingCalendar;
