import { ui } from "../i18n/ui";
import { useBookingForm } from "../utils/useBookingForm";
import Button from "./button";
import type { BookingFormProps } from "../utils/types";
import { useEffect, useRef } from "react";

const BookingForm: React.FC<BookingFormProps> = ({
  lang,
  onAccommodationChange,
  checkInDate,
  checkOutDate,
  onDateChange,
}) => {
  const { maxGuests, handleAccommodationTypeChange, handleSubmit, accommodationType } = useBookingForm({
    onAccommodationChange,
    onDateChange,
    initialCheckIn: checkInDate,
    initialCheckOut: checkOutDate,
  });

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const preventNativeDatePicker = (e: MouseEvent) => {
      if (e.target === startDateRef.current || e.target === endDateRef.current) {
        e.preventDefault();
      }
    };

    document.addEventListener("click", preventNativeDatePicker);
    return () => {
      document.removeEventListener("click", preventNativeDatePicker);
    };
  }, []);

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 15; hour <= 23; hour++) {
      for (let minute of [0, 30]) {
        const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        options.push(
          <option key={timeString} value={timeString}>
            {timeString}
          </option>,
        );
      }
    }
    return options;
  };

  const formattedCheckInDate = checkInDate
    ? `${checkInDate.getFullYear()}-${String(checkInDate.getMonth() + 1).padStart(2, "0")}-${String(
        checkInDate.getDate(),
      ).padStart(2, "0")}`
    : "";
  const formattedCheckOutDate = checkOutDate
    ? `${checkOutDate.getFullYear()}-${String(checkOutDate.getMonth() + 1).padStart(2, "0")}-${String(
        checkOutDate.getDate(),
      ).padStart(2, "0")}`
    : "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="pt-[32px] lg:pt-[64px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            value={accommodationType}
          >
            <option value="">{ui[lang].booking.selectOption}</option>
            <option value="House 12">House 12</option>
            <option value="Loft 12">Loft 12</option>
          </select>
        </div>
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
            value={formattedCheckInDate}
            onChange={handleInputChange}
            ref={startDateRef}
            readOnly
            onFocus={(e) => e.target.blur()}
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
            value={formattedCheckOutDate}
            onChange={handleInputChange}
            ref={endDateRef}
            readOnly
            onFocus={(e) => e.target.blur()}
            placeholder={checkInDate && !checkOutDate ? ui[lang].errors.invalidDate : ""}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="flex-1">
            <label htmlFor="guestsNumber" className="block mb-2 font-dm text-lg">
              {ui[lang].booking.numberOfGuests}
            </label>
            <input
              type="number"
              id="guestsNumber"
              name="guestsNumber"
              min="1"
              max={maxGuests || undefined}
              required
              className="w-full px-4 py-2 border rounded-lg font-jost"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="checkInTime" className="block mb-2 font-dm text-lg">
              {ui[lang].booking.checkInTime}
            </label>
            <select
              id="checkInTime"
              name="checkInTime"
              required
              className="w-full px-4 py-2 border rounded-lg font-jost"
            >
              {generateTimeOptions()}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 font-dm text-lg">
            {ui[lang].contactForm.name}
          </label>
          <input type="text" id="name" name="name" required className="w-full px-4 py-2 border rounded-lg font-jost" />
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

      <div className="mt-8">
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

      <div className="mt-8">
        <Button text={ui[lang].booking.sendRequest} type="submit" />
      </div>
    </form>
  );
};

export default BookingForm;
