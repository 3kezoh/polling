import express from "express";
import crypto from "crypto";
import { EventEmitter } from "events";

interface User {
  id: string;
  email: string;
}

const app = express();

const users: User[] = [];

const eventEmitter = new EventEmitter();

app.get("/api/users", (_request, response) => {
  eventEmitter.once("new user", () => {
    response.json(users);
  });
});

app.use(express.static("src/client"));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

setInterval(() => {
  users.push({
    id: crypto.randomUUID(),
    email: `${crypto.randomUUID()}@gmail.com`,
  });

  eventEmitter.emit("new user");
}, 5000);
