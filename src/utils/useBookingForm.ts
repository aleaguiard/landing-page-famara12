import { useState } from "react";

export const useBookingForm = (onAccommodationChange: (value: string) => void) => {
  const [maxGuests, setMaxGuests] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
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
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validación de campos vacíos
    if (!data.accommodationType || !data.startDate || !data.endDate || !data.guestsNumber) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    // Validación de fechas
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

    // Validación de número de huéspedes
    const guestCount = parseInt(data.guestsNumber as string, 10);
    if (maxGuests === null) {
      alert("Por favor, seleccione un tipo de alojamiento.");
      return;
    }
    if (guestCount > maxGuests) {
      alert(`El máximo de huéspedes para ${accommodationType} es ${maxGuests}`);
      return;
    }

    // Envío del formulario
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
        setStartDate("");
        setEndDate("");
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
    handleAccommodationTypeChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSubmit,
    accommodationType,
  };
};
