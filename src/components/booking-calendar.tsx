import React from 'react';
import BookingForm from './booking-form';

const BookingCalendar: React.FC = () => {
	return (
		<section className="px-8 xl:px-0 w-full mt-[40px] lg:mt-[40px] ">
			<div className="w-full lg:max-w-[1200px] p-12 mx-auto lg:px-[116px] lg:py-[40px] bg-primary-300 rounded-[70px]">
				<h2 className="font-dm tracking-wide text-center leading-[37px] lg:leading-[62.50px] text-[30px] lg:text-[40px] w-full capitalize lg:max-w-[75%] pb-2 mx-auto">
					CALENDAR TO BOOK
				</h2>
				<p className="text-base md:text-[20px] text-center tracking-tight font-jost text-text-gray leading-[33px] lg:max-w-[60%] mx-auto">
					Select your dates and preferences
				</p>
				<BookingForm />
				<small className="text-text-gray text-xs mt-4 block">
					*Please note that the booking will be confirmed once you receive the
					confirmation email.
				</small>
			</div>
		</section>
	);
};

export default BookingCalendar;
