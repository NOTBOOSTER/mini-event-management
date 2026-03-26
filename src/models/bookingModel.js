import pool from "../config/db.js";

export const addBooking = async ({
  user_id,
  event_id,
  tickets,
  confirmation_code,
}) => {
  console.log(user_id, event_id, tickets, confirmation_code);
  const [result] = await pool.query(
    "INSERT INTO bookings (user_id, event_id, tickets_booked, confirmation_code) VALUES (?, ?, ?, ?)",
    [user_id, event_id, tickets, confirmation_code]
  );
  return {
    id: result.insertId,
    user_id,
    event_id,
    tickets_booked: tickets,
    confirmation_code,
  };
};

export const getBookingByUserId = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT b.id, b.tickets_booked, b.confirmation_code, b.booking_date, e.title AS event_title, e.date AS event_date FROM bookings b JOIN events e ON b.event_id = e.id WHERE b.user_id = ?",
    [user_id]
  );
  return rows;
};

export const getBookingByConfirmationCode = async (confirmation_code) => {
  const [rows] = await pool.query(
    "SELECT b.id, b.tickets_booked, b.confirmation_code, b.booking_date, e.title AS event_title, e.date AS event_date FROM bookings b JOIN events e ON b.event_id = e.id WHERE b.confirmation_code = ?",
    [confirmation_code]
  );
  return rows[0];
};
