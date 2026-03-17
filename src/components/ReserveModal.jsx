import "../css/modal.css";
import close from "../assets/close.png";
import { getBooking, reserveBooking } from "../helpers/booking";
import { generateDays } from "../helpers/date";
import { useState } from "react";

const ReserveModal = ({ court, closeModal }) => {
  if (!court) return null;

  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [reserving, setReserving] = useState(false);

  const days = generateDays(5);

  const handleSelectDate = async (date) => {
    setSelectedDate(date);
    setSelectedHour(null);
    setLoading(true);

    try {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);

      const booking = await getBooking(
        normalizedDate.toISOString(),
        court._id
      );

      const allHours = [18, 19, 20, 21, 22, 23];

      const freeHours = allHours.filter((hour) => {
        const key = `time${hour}hs`;
        const status = booking?.[key]?.status;
        return !status || status === "Cancelada";
      });

      setAvailableHours(freeHours);
    } catch (error) {
      console.log("Error obteniendo horarios:", error);
      setAvailableHours([]);
      alert("No se pudieron cargar los horarios");
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async () => {
    if (!selectedDate || !selectedHour) {
      alert("Selecciona fecha y horario");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || "69b72e714a9f29aa7602d50f";

    if (!userId) {
      alert("Debes iniciar sesión para reservar");
      return;
    }

    setReserving(true);

    try {
      const normalizedDate = new Date(selectedDate);
      normalizedDate.setHours(0, 0, 0, 0);

      const response = await reserveBooking(
        court._id,
        normalizedDate.toISOString(),
        selectedHour,
        userId
      );

      console.log("RESERVA:", response);

      if (!response?.ok) {
        throw new Error(response?.message || response?.msg || "No se pudo realizar la reserva");
      }

      alert("Reserva realizada correctamente");
      setSelectedHour(null);
      await handleSelectDate(selectedDate);
    } catch (error) {
      console.log("Error al reservar:", error);
      alert(error.message || "No se pudo realizar la reserva");
    } finally {
      setReserving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="reserve-modal col-12 col-md-10 col-lg-7 col-xl-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={closeModal}>
          <img src={close} alt="cerrar" />
        </button>

        <h6>Reservar Turno</h6>
        <h5>{court.name}</h5>

        <p className="mt-3">Fecha</p>

        <div className="dates-container">
          {days.map((day, i) => {
            const isSelected =
              selectedDate &&
              new Date(selectedDate).toDateString() === day.toDateString();

            return (
              <button
                type="button"
                key={i}
                onClick={() => handleSelectDate(day)}
                className={isSelected ? "date active" : "date"}
                disabled={loading || reserving}
              >
                {day.getDate()}/{day.getMonth() + 1}
              </button>
            );
          })}
        </div>

        <p className="mt-3">Horarios Disponibles</p>

        {loading && (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        {!loading && selectedDate && availableHours.length === 0 && (
          <p>No hay horarios disponibles para esa fecha.</p>
        )}

        <div className="hours-container">
          {availableHours.map((hour, i) => (
            <button
              type="button"
              key={i}
              className={selectedHour === hour ? "hour active" : "hour"}
              onClick={() => setSelectedHour(hour)}
              disabled={reserving}
            >
              {hour}:00
            </button>
          ))}
        </div>

        <div className="reserve-footer">
          <span>${court.pricePerHour}</span>
          <button
            type="button"
            className="btn-reserve"
            onClick={handleReserve}
            disabled={!selectedDate || !selectedHour || reserving}
          >
            {reserving ? "Reservando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveModal;