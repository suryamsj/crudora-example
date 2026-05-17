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
});

server
  .registerModel(User)
  .generateRoutes()
  .listen(() => {
    console.log("Server running on port 3000");
  });
