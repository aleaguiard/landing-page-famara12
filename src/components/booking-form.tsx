import { useBookingForm } from '../utils/useBookingForm';
import Button from './button';

const BookingForm: React.FC = () => {
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
			className="pt-[70px] lg:pt-[100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
		>
			<div className="space-y-4">
				<div>
					<label htmlFor="startDate" className="block mb-2 font-dm text-lg">
						Check-in Date:
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
						Check-out Date:
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
						Accommodation Type:
					</label>
					<select
						id="accommodationType"
						name="accommodationType"
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
						onChange={handleAccommodationTypeChange}
					>
						<option value="">Select an option</option>
						<option value="House 12">House 12</option>
						<option value="Loft 12">Loft 12</option>
					</select>
				</div>
				<div>
					<label htmlFor="guestsNumber" className="block mb-2 font-dm text-lg">
						Number of Guests:
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
						Check-in Time:
					</label>
					<input
						type="time"
						id="checkInTime"
						name="checkInTime"
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
						min="15:00"
						step="1800"
					/>
				</div>
				<div>
					<label htmlFor="email" className="block mb-2 font-dm text-lg">
						Email:
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
					Special Requests:
				</label>
				<textarea
					id="specialRequests"
					name="specialRequests"
					rows={3}
					className="w-full px-4 py-2 border rounded-lg font-jost"
				></textarea>
			</div>

			<div className="md:col-span-2 lg:col-span-3">
				<Button text="Send Request" type="submit" />
			</div>
		</form>
	);
};

export default BookingForm;