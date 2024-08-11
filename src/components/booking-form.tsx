import { ui } from '../i18n/ui';
import { useBookingForm } from '../utils/useBookingForm';
import Button from './button';

interface BookingFormProps {
	lang: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ lang }) => {
	const {
		maxGuests,
		handleAccommodationTypeChange,
		handleStartDateChange,
		handleEndDateChange,
		handleSubmit,
	} = useBookingForm();

	return (
		<form
			onSubmit={handleSubmit}
			className="pt-[32px] lg:pt-[64px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
		>
			<div className="space-y-4">
				<div>
					<label htmlFor="startDate" className="block mb-2 font-dm text-lg">
						{ui[lang].booking.checkInDate}
					</label>
					<input
						type="date"
						id="startDate"
						name="startDate"
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
						onChange={handleStartDateChange}
					/>
				</div>
				<div>
					<label htmlFor="endDate" className="block mb-2 font-dm text-lg">
						{ui[lang].booking.checkOutDate}
					</label>
					<input
						type="date"
						id="endDate"
						name="endDate"
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
						onChange={handleEndDateChange}
					/>
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<label htmlFor="accommodationType" className="block mb-2 font-dm text-lg">
						{ui[lang].booking.accommodationType}
					</label>
					<select
						id="accommodationType"
						name="accommodationType"
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
						onChange={handleAccommodationTypeChange}
					>
						<option value="">{ui[lang].booking.selectOption}</option>
						<option value="House 12">House 12</option>
						<option value="Loft 12">Loft 12</option>
					</select>
				</div>
				<div>
					<label htmlFor="guestsNumber" className="block mb-2 font-dm text-lg">
						{ui[lang].booking.numberOfGuests}
					</label>
					<input
						type="number"
						id="guestsNumber"
						name="guestsNumber"
						min="1"
						max={maxGuests}
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
					/>
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<label htmlFor="checkInTime" className="block mb-2 font-dm text-lg">
						{ui[lang].booking.checkInTime}
					</label>
					<input
						type="time"
						id="checkInTime"
						name="checkInTime"
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
						min="15:00"
					/>
				</div>
				<div>
					<label htmlFor="email" className="block mb-2 font-dm text-lg">
						{ui[lang].booking.email}
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
					/>
				</div>
			</div>

			<div className="md:col-span-2 lg:col-span-3">
				<label htmlFor="specialRequests" className="block mb-2 font-dm text-lg">
					{ui[lang].booking.specialRequests}
				</label>
				<textarea
					id="specialRequests"
					name="specialRequests"
					rows={3}
					className="w-full px-4 py-2 border rounded-lg font-jost"
				></textarea>
			</div>

			<div className="md:col-span-2 lg:col-span-3">
				<Button text={ui[lang].booking.sendRequest} type="submit" />
			</div>
		</form>
	);
};

export default BookingForm;
