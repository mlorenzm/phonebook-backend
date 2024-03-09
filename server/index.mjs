import express from "express";
import morgan from "morgan";
import { persons } from "./utils/persons.mjs";
import router from "../routes/index.mjs";
import {} from "dotenv/config";
const app = express();
import cors from "cors";
const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("dist"));
app.use(router);

app.get("/", (req, res) => {
  res.send("backend homepage");
});

app.get("/info", (req, res) => {
  const len = persons.length;
  const time = new Date();
  const infoMsg = `<h1>Phonebook has info for ${len} people</h1><br/>
  ${time}`;

  res.send(infoMsg);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.listen(PORT, () => {
  console.log(`Example app listening on  http://localhost:${PORT}`);
});
