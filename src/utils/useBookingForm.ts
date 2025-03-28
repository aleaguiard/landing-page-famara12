import { useState } from "react";

interface UseBookingFormProps {
  onAccommodationChange: (value: string) => void;
  onDateChange?: (start: Date | null, end: Date | null) => void;
  initialCheckIn?: Date | null;
  initialCheckOut?: Date | null;
}

export const useBookingForm = ({
  onAccommodationChange,
  onDateChange,
  initialCheckIn = null,
  initialCheckOut = null,
}: UseBookingFormProps) => {
  const [maxGuests, setMaxGuests] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(initialCheckIn);
  const [endDate, setEndDate] = useState<Date | null>(initialCheckOut);
  const [accommodationType, setAccommodationType] = useState<string>("");

  const handleAccommodationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setAccommodationType(value);

    if (value === "House 12") {
      setMaxGuests(4);
    } else if (value === "Loft 12") {
      setMaxGuests(2);
    } else {
      setMaxGuests(null);
    }

    onAccommodationChange(value);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value ? new Date(event.target.value) : null;

    if (date && !isNaN(date.getTime())) {
      setStartDate(date);
      if (onDateChange) {
        onDateChange(date, endDate);
      }
    } else if (date === null) {
      setStartDate(null);
      if (onDateChange) {
        onDateChange(null, endDate);
      }
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value ? new Date(event.target.value) : null;

    if (date && !isNaN(date.getTime())) {
      setEndDate(date);
      if (onDateChange) {
        onDateChange(startDate, date);
      }
    } else if (date === null) {
      setEndDate(null);
      if (onDateChange) {
        onDateChange(startDate, null);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.accommodationType || !data.startDate || !data.endDate || !data.guestsNumber) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    const startDateObj = new Date(data.startDate as string);
    const endDateObj = new Date(data.endDate as string);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      alert("Por favor, ingrese fechas válidas.");
      return;
    }

    if (startDateObj >= endDateObj) {
      alert("La fecha de inicio debe ser anterior a la fecha de fin.");
      return;
    }

    const nightsDifference = (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24);
    if (nightsDifference < 4) {
      alert("La estancia mínima es de 4 noches.");
      return;
    }

    const guestCount = parseInt(data.guestsNumber as string, 10);
    if (maxGuests === null) {
      alert("Por favor, seleccione un tipo de alojamiento.");
      return;
    }
    if (guestCount > maxGuests) {
      alert(`El máximo de huéspedes para ${accommodationType} es ${maxGuests}`);
      return;
    }

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Solicitud enviada con éxito. Nos pondremos en contacto contigo pronto.");
        form.reset();
        setAccommodationType("");
        setMaxGuests(null);
        setStartDate(null);
        setEndDate(null);

        if (onDateChange) {
          onDateChange(null, null);
        }
      } else {
        alert("Error al enviar la solicitud. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar la solicitud.");
    }
  };

  return {
    maxGuests,
    startDate,
    endDate,
    handleAccommodationTypeChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSubmit,
    accommodationType,
  };
};
