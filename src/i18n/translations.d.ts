interface UiTranslations {
	[lang: string]: {
		nav: {
			title: string;
			home: string;
			properties: string;
			booking: string;
			contact: string;
		};
		footer: {
			contact: string;
			license: string;
		};
		booking: {
			checkInDate: string;
			checkOutDate: string;
			accommodationType: string;
			selectOption: string;
			numberOfGuests: string;
			checkInTime: string;
			email: string;
			specialRequests: string;
			sendRequest: string;
			calendarTitle: string;
			selectDates: string;
			minimumStay: string;
			selectAccommodation: string;
			noBookingsAvailable: string;
			confirmationNote: string;
		};
		contactForm: {
			name: string;
			email: string;
			subject: string;
			phone: string;
			message: string;
			sendMessage: string;
			info: string;
		};
		routes: {
			home: string;
			properties: string;
			booking: string;
			contact: string;
		};
		index: {
			info: string;
			servicesTitle: string;
			famaraBeachTitle: string;
			famaraBeachDescription: string;
			reviewsTitle: string;
		};
		button: {
			bookNow: string;
			discoverMore: string;
		};
		errors: {
			invalidDate: string;
			errorFetchingReservations: string;
		};
	};
}
