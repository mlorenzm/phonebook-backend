const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("backend homepage");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const len = persons.length;
  const time = new Date();
  const infoMsg = `<h1>Phonebook has info for ${len} people</h1><br/>
  ${time}`;

  response.send(infoMsg);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  if (id <= persons.length) {
    const person = persons.filter((person) => person.id !== id);
    response.json(person);
  } else {
    return response.sendStatus(404);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  if (id <= persons.length) {
    persons = persons.filter((person) => person.id !== id);
    response.sendStatus(204);
  } else {
    return response.sendStatus(404);
  }
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  if (!body) {
    return response.sendStatus(404);
  }
  if (!body.name) {
    return response.status(500).send({ error: "Name not defined" });
  }
  if (!body.number) {
    return response.status(500).send({ error: "Number not defined" });
  }
  if (persons.some((item) => item.name === body.name)) {
    return response
      .status(500)
      .send({ error: "This person is already in your phonebook" });
  }
  const person = {
    id: Math.round(Math.random() * 500),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
