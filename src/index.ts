import 'reflect-metadata';
import 'dotenv/config';
import { CrudoraServer } from "crudora";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { User } from "./model/User";

const pool = mysql.createPool({ uri: process.env.DATABASE_URL });
const db = drizzle(pool);

export const server = new CrudoraServer({
  port: 3000,
  db,
  dialect: 'mysql',
  docs: {
  path: '/docs',           // custom mount path, e.g. '/api-docs'
  title: 'My API',         // shown in Scalar UI header
  version: '1.0.0',
  description: 'Full description of what this API does.',
  scalar: {                // any @scalar/express-api-reference option
    theme: 'purple',       // 'default' | 'alternate' | 'moon' | 'purple' | ...
    darkMode: true,
    layout: 'modern',     // 'modern' (default) | 'classic'
  },
}
});

server
  .registerModel(User)
  .generateRoutes()
  .listen(() => {
    console.log("Server running on port 3000");
  });
