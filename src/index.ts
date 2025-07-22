import { CrudoraServer } from "crudora";
import { PrismaClient } from "@prisma/client";
import { User } from "./model/User";

const prisma = new PrismaClient();

const server = new CrudoraServer({
  port: 3000,
  prisma: prisma,
});

server
  .registerModel(User)
  .generateRoutes()
  .listen(() => {
    console.log("Server running on port 3000");
  });
