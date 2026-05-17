import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import { userTable } from './schema';

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

const users = [
  { name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
];

async function seed() {
  const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL });
  const db = drizzle(connection);

  console.log('Seeding users...');

  for (const user of users) {
    await db.insert(userTable).values({
      id: crypto.randomUUID(),
      name: user.name,
      email: user.email,
      password: hashPassword(user.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(`Created user: ${user.email}`);
  }

  console.log('Done!');
  await connection.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
