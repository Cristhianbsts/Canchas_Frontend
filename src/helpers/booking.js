const url = "http://localhost:3002/api/book/booking";

export const getBooking = async (date, fieldId) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, fieldId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener reservas");
    }

    return data.msg;
  } catch (error) {
    console.log("getBooking error:", error);
    return null;
  }
};

const reserveUrl = "http://localhost:3002/api/book/reserveBooking";

export const reserveBooking = async (fieldId, date, time, userId) => {
  try {
    const response = await fetch(reserveUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fieldId,
        date,
        time,
        userId,
        status: "Confirmada",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al reservar");
    }

    return data;
  } catch (error) {
    console.log("reserveBooking error:", error);
    return { ok: false, message: error.message };
  }
};