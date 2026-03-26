import pool from "../config/db.js"

export const insertAttendance = async ({ booking_id, user_id, event_id }) => {
  const [result] = await pool.query(
    "INSERT INTO event_attendance (booking_id, user_id, event_id) VALUES (?, ?, ?)",
    [booking_id, user_id, event_id]
  );
  return {
    id: result.insertId,
    booking_id,
    user_id,
    event_id,
  };
}

export const checkAttendance = async (booking_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM event_attendance WHERE booking_id = ?",
    [booking_id]
  );
  return rows.length > 0;
}