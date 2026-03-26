import pool from "../config/db.js";

export const findUpcomingEvents = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM events WHERE date > NOW() ORDER BY date ASC"
  );
  return rows;
};

export const addEvent = async ({
  title,
  description,
  date,
  total_capacity,
  remaining_tickets = total_capacity,
}) => {
  const mysqlDate = new Date(date).toISOString().slice(0, 19).replace("T", " ");

  const [result] = await pool.query(
    "INSERT INTO events (title, description, date, total_capacity, remaining_tickets) VALUES (?, ?, ?, ?, ?)",
    [title, description, mysqlDate, total_capacity, remaining_tickets]
  );
  return result.insertId;
};

export const updateRemainingTickets = async (event_id, tickets) => {
  await pool.query(
    "UPDATE events SET remaining_tickets = remaining_tickets - ? WHERE id = ?",
    [tickets, event_id]
  );
};

export const getRemainingTickets = async (event_id) => {
  const [rows] = await pool.query(
    "SELECT remaining_tickets FROM events WHERE id = ?",
    [event_id]
  );
  return rows[0].remaining_tickets;
};

export const getEventById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
  return rows[0];
};
