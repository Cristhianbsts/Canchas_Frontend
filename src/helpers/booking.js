const url = "http://localhost:4200/api/book/booking";

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

    if (!data.ok) throw new Error("Error al obtener reservas");

    return data.msg;

  } catch (error) {
    console.log(error);
    return null;
  }
};

const reserveUrl = "http://localhost:4200/api/book/reserve";

export const reserveBooking = async (
  fieldId,
  date,
  time,
  userId
) => {
  try {
    const response = await fetch(reserveUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fieldId,
        date,
        time,
        userId,
        status: "Confirmado",
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};