import "../css/modal.css";
import close from "../assets/close.png";
import { getBooking } from "../helpers/booking";
import { reserveBooking } from "../helpers/booking";
import { generateDays } from "../helpers/date";
import { useState } from "react";

const ReserveModal = ({ court, closeModal }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  const days = generateDays(5);

  const handleSelectDate = async (date) => {
    setSelectedDate(date);
    setSelectedHour(null);
    setLoading(true);

    try {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);

      const data = await getBooking(normalizedDate.toISOString(), court._id);

      console.log("DATA BACK:", data);

      const booking = data?.msg;
      const allHours = [18, 19, 20, 21, 22, 23];

      const freeHours = allHours.filter((hour) => {
        const key = `time${hour}hs`;
        return !booking?.[key]?.status;
      });

      setAvailableHours(freeHours);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  const handleReserve = async () => {
    if (!selectedDate || !selectedHour) {
      alert("Selecciona fecha y horario");
      return;
    }

    const userId = "123456"; // luego sale del context/login

    const response = await reserveBooking(
      court._id,
      selectedDate.toISOString(),
      selectedHour,
      userId,
    );

    console.log("RESERVA:", response);

    // volver a cargar horarios
    handleSelectDate(selectedDate);
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="reserve-modal col-12 col-md-10 col-lg-7 col-xl-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={closeModal}>
          <img src={close} alt="cerrar" />
        </button>

        <h6>Reservar Turno</h6>
        <h5>{court.name}</h5>

        {/* FECHAS */}
        <p className="mt-3">Fecha</p>

        <div className="dates-container">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => handleSelectDate(day)}
              className="date"
            >
              {day.getDate()}/{day.getMonth() + 1}
            </button>
          ))}
        </div>

        {/* HORARIOS */}
        <p className="mt-3">Horarios Disponibles</p>

        {loading && (
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}

        <div className="hours-container">
          {availableHours.map((hour, i) => (
            <button
              key={i}
              className={selectedHour === hour ? "hour active" : "hour"}
              onClick={() => setSelectedHour(hour)}
            >
              {hour}:00
            </button>
          ))}
        </div>
        <div className="reserve-footer">
          <span>${court.pricePerHour}</span>
          <button className="btn-reserve" onClick={handleReserve}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveModal;
