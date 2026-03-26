# Event Booking System

A mini event management system built with Node.js, Express, and MySQL.

## Test Url

```bash
https://event.straynodes.xyz/api
```

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- Zod (validation)
- Swagger UI (API docs)

---

## Requirements

- Node.js v22 or above
- MySQL v8 or above

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/NOTBOOSTER/mini-event-management.git
cd mini-event-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

```bash
cp .env.example .env
```

Open .env and update the values:

```env
NODE_ENV=production
SERVER_PORT=3333
DB_HOST=localhost
DB_PORT=3306
DB_NAME=event_booking
DB_USER=root
DB_PASSWORD=root
```

### 4. Run the server

```bash
npm start
```

The server will automatically create the database and all tables on first run.
No manual SQL setup needed.

---

## Docker Setup

### 1. Build the image

```bash
docker build -t event-booking .
```

### 2. Run the container

```bash
docker run -p 3333:3333 \
  -e NODE_ENV=production \
  -e SERVER_PORT=3333 \
  -e DB_HOST=your_db_host \
  -e DB_PORT=3306 \
  -e DB_NAME=event_booking \
  -e DB_USER=root \
  -e DB_PASSWORD=root \
  event-booking
```

Or using your env file:

```bash
docker run -p 3333:3333 --env-file .env event-booking
```

---

## API Docs

Once the server is running open the following URL in your browser:

```
http://localhost:3333/api-docs
```

OR

```
https://event.straynodes.xyz/api-docs
```

---

## Endpoints

| Method | Endpoint                   | Description                               |
| ------ | -------------------------- | ----------------------------------------- |
| GET    | /api/events                | List all upcoming events                  |
| POST   | /api/events                | Create a new event                        |
| POST   | /api/users/create          | Create a new user                         |
| POST   | /api/bookings              | Book a ticket for a user                  |
| GET    | /api/users/:id/bookings    | Get all bookings for a user               |
| POST   | /api/events/:id/attendance | Check tickets booked by confirmation code |

---

## Manual Database Setup

If you prefer to set up the database manually instead of letting the server do it:

```bash
mysql -u root -p < schema.sql
```

---

## Project Structure

```
src/
    config/         database pool and environment config
    db/             database initialization eg creating table etc
    models/         raw SQL queries of routes
    controllers/    request handling and responses
    routes/         API route definitions
    middleware/     validation and error handling
    utils/          logger, error classes, helpers
```

---

## Notes

- All dates must be in ISO format: 2026-06-01T10:00:00Z
- Booking returns a unique confirmation code
- Use that code with the attendance endpoint to check tickets booked
