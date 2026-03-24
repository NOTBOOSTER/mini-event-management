import { DB_NAME } from "../config/envLoader.js";

const initDb = async (pool) => {
    try {
        console.log("Initializing database...");
        await pool.query(`
            CREATE DATABASE IF NOT EXISTS ${DB_NAME}
        `);
        await pool.query(`
            USE ${DB_NAME}
        `);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default initDb;