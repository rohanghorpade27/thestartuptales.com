import { betterAuth } from "better-auth";
import pg from "pg";

const { Pool } = pg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      age: { type: "number", required: true },
      mobile: { type: "string", required: true },
      gender: { type: "string", required: true },
    },
  },
});
