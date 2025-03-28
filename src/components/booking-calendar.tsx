import { useState, useEffect, useCallback } from "react";
import BookingForm from "./booking-form";
import { ui } from "../i18n/ui";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as React from "react";
import type { CalendarProps } from "react-calendar";
import type { BookingCalendarProps, Reserva } from "../utils/types";
import { isAfter, addDays } from "date-fns";
import { FaTimesCircle, FaCheckCircle, FaCalendarDay } from "react-icons/fa";

const BookingCalendar: React.FC<BookingCalendarProps> = ({ lang }) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Cargar reservas cuando se selecciona un alojamiento
  useEffect(() => {
    if (selectedAccommodation) {
      cargarReservas();
    } else {
      setReservas([]);
      setDateRange([null, null]);
    }
  }, [selectedAccommodation]);

  // Función para cargar las reservas desde la API
  async function cargarReservas() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/reservation?loft=${selectedAccommodation}`);
      if (!response.ok) {
        throw new Error(ui[lang].errors.errorFetchingReservations);
      }
      const data = await response.json();
      setReservas(data);
      setError(null);
    } catch (error) {
      setError(ui[lang].errors.errorFetchingReservations);
    } finally {
      setIsLoading(false);
    }
  }

  // Manejar el cambio de alojamiento
  const handleAccommodationChange = useCallback((value: string) => {
    setSelectedAccommodation(value);
    setDateRange([null, null]); // Reiniciar fechas al cambiar de alojamiento
  }, []);

  // Verificar si una fecha está ocupada
  const isDateOccupied = useCallback(
    (date: Date): boolean => {
      return reservas.some((reserva) => {
        const start = new Date(reserva.start);
        const end = new Date(reserva.end);
        return date >= start && date < end;
      });
    },
    [reservas],
  );

  // Verificar si hay fechas bloqueadas en un rango
  const hasBlockedDatesInRange = useCallback(
    (start: Date, end: Date): boolean => {
      const currentDate = new Date(start);
      while (currentDate < end) {
        if (isDateOccupied(currentDate)) {
          return true;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return false;
    },
    [isDateOccupied],
  );

  // Manejar el cambio de fecha en el calendario
  const handleDateChange: CalendarProps["onChange"] = useCallback(
    (value: any) => {
      if (Array.isArray(value) || !(value instanceof Date)) {
        return;
      }

      const [start, end] = dateRange;

      // Si no hay fecha de inicio, seleccionar la primera fecha
      if (!start) {
        setTempStartDate(value);
        setDateRange([value, null]);
      } else if (!end) {
        // Si hay una fecha de inicio pero no de fin
        if (value.getTime() === start.getTime()) {
          // Si se hace clic en la misma fecha, deseleccionar
          setDateRange([null, null]);
          setTempStartDate(null);
        } else if (value <= start) {
          // Si la nueva fecha es anterior a la fecha de inicio, cambiar la fecha de inicio
          setTempStartDate(value);
          setDateRange([value, null]);
        } else {
          // Verificar que haya al menos 4 noches disponibles
          const diffTime = Math.abs(value.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays < 4) {
            // Si no hay 4 noches, ajustar la fecha de fin
            const newEndDate = addDays(start, 4);
            if (!hasBlockedDatesInRange(start, newEndDate)) {
              setDateRange([start, newEndDate]);
              setTempStartDate(null);
            }
          } else {
            // Si hay 4 noches disponibles, seleccionar el rango
            if (!hasBlockedDatesInRange(start, value)) {
              setDateRange([start, value]);
              setTempStartDate(null);
            }
          }
        }
      } else {
        // Si hay un rango completo, reiniciar la selección
        setDateRange([null, null]);
        setTempStartDate(null);
      }
    },
    [dateRange, hasBlockedDatesInRange],
  );

  // Contenido personalizado para las celdas del calendario
  const tileContent = useCallback(
    ({ date, view }: { date: Date; view: string }) => {
      if (view !== "month") return null;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Fechas pasadas
      if (!isAfter(date, today)) {
        return <FaTimesCircle className="icon past-date-icon" />;
      }

      // Fechas ocupadas
      if (isDateOccupied(date)) {
        return <FaTimesCircle className="icon occupied-date-icon" />;
      }

      // Fechas seleccionadas
      const [start, end] = dateRange;
      if (start && end && date >= start && date <= end) {
        return <FaCalendarDay className="icon selected-date-icon" />;
      }

      // Fechas disponibles
      if (!isDateOccupied(date)) {
        return <FaCheckCircle className="icon available-date-icon" />;
      }

      return null;
    },
    [dateRange, isDateOccupied],
  );

  // Deshabilitar fechas no disponibles
  const tileDisabled = useCallback(
    ({ date, view }: { date: Date; view: string }) => {
      if (view !== "month") return false;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Deshabilitar fechas pasadas
      if (!isAfter(date, today)) {
        return true;
      }

      // Deshabilitar fechas ocupadas
      return isDateOccupied(date);
    },
    [isDateOccupied],
  );

  const handleExternalDateChange = useCallback((start: Date | null, end: Date | null) => {
    setDateRange([start, end]);
  }, []);

  return (
    <section className="px-4 sm:px-8 xl:px-0 w-full mt-[40px] lg:mt-[40px]">
      <div className="w-full lg:max-w-[1200px] p-6 sm:p-12 mx-auto lg:px-[116px] lg:py-[40px] bg-primary-300 rounded-[40px] sm:rounded-[70px] shadow-lg">
        <h2 className="font-dm tracking-wide text-center leading-[30px] sm:leading-[37px] lg:leading-[62.50px] text-[24px] sm:text-[30px] lg:text-[40px] w-full capitalize lg:max-w-[75%] pb-2 mx-auto">
          {ui[lang].booking.calendarTitle}
        </h2>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {selectedAccommodation && (
          <div className="flex flex-col items-center mt-6 mb-6 sm:mt-8 sm:mb-8">
            <Calendar
              onChange={handleDateChange}
              value={dateRange}
              tileContent={tileContent}
              tileDisabled={tileDisabled}
              selectRange={false}
              className="react-calendar fancy-calendar"
              locale={lang}
              navigationLabel={({ date }) => (
                <span className="text-primary-500 font-semibold text-sm sm:text-base">
                  {new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" }).format(date)}
                </span>
              )}
            />
            <small className="text-text-gray text-xs mt-2">*{ui[lang].booking.minimumStay}</small>
          </div>
        )}

        {reservas.length === 0 && !isLoading && (
          <p className="text-center mt-4">
            {selectedAccommodation ? ui[lang].booking.noBookingsAvailable : ui[lang].booking.selectAccommodation}
          </p>
        )}

        <BookingForm
          lang={lang}
          onAccommodationChange={handleAccommodationChange}
          checkInDate={dateRange[0]}
          checkOutDate={dateRange[1]}
          onDateChange={handleExternalDateChange}
        />

        <small className="text-text-gray text-xs mt-4 block">{ui[lang].booking.confirmationNote}</small>
      </div>

      <style>{`
        .fancy-calendar {
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 10px;
            width: 100%;
            max-width: 400px;
            font-size: 14px;
        }
        
        @media (min-width: 640px) {
            .fancy-calendar {
                padding: 20px;
                font-size: 16px;
            }
        }
        
        .fancy-calendar .react-calendar__navigation {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .fancy-calendar .react-calendar__navigation button {
            min-width: 30px;
            padding: 5px;
            border-radius: 5px;
        }
        
        .fancy-calendar .react-calendar__month-view__weekdays {
            font-size: 0.8em;
            font-weight: bold;
        }
        
        .fancy-calendar .react-calendar__month-view__days {
            display: grid !important;
            grid-template-columns: repeat(7, 1fr);
        }
        
        .fancy-calendar .react-calendar__tile {
            border-radius: 10px;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 5px 0;
            height: 40px;
        }
        
        @media (min-width: 640px) {
            .fancy-calendar .react-calendar__tile {
                height: 50px;
                padding: 10px 0;
            }
        }

        .fancy-calendar .react-calendar__tile:hover {
            background: #f0f0f0;
            color: #333;
        }

        .fancy-calendar .react-calendar__tile--active {
            background: #007bff;
            color: white;
        }

        .fancy-calendar .icon {
            font-size: 1em;
            margin-top: 2px;
        }
        
        @media (min-width: 640px) {
            .fancy-calendar .icon {
                font-size: 1.2em;
                margin-top: 5px;
            }
        }

        .fancy-calendar .occupied-date-icon {
            color: #ff4444;
        }

        .fancy-calendar .selected-date-icon {
            color: white;
        }

        .fancy-calendar .available-date-icon {
            color: #00c853;
        }

        .fancy-calendar .past-date-icon {
            color: #999;
        }
      `}</style>
    </section>
  );
};

export default BookingCalendar;
