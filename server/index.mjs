import express from "express";
import morgan from "morgan";
import { persons } from "./utils/persons.mjs";
import router from "../routes/index.mjs";

const app = express();
import cors from "cors";
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("dist"));
app.use(router);

app.get("/", (request, response) => {
  response.send("backend homepage");
});

app.get("/info", (request, response) => {
  const len = persons.length;
  const time = new Date();
  const infoMsg = `<h1>Phonebook has info for ${len} people</h1><br/>
  ${time}`;

  response.send(infoMsg);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.listen(PORT, () => {
  console.log(`Example app listening on  http://localhost:${PORT}`);
});
