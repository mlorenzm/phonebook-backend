import { Router } from "express";
import { persons } from "../server/utils/persons.mjs";
import express from "express";
import morgan from "morgan";
import { Contact } from "../server/db/mongo.mjs";
const personRouter = Router();
personRouter.use(express.json());
personRouter.use(morgan("tiny"));
personRouter.get("/api/persons", (request, response) => {
  response.json(persons);
});

personRouter.get("/api/persons/:id", (request, response) => {
  Contact.findById(request.params.id).then((contact) => {
    response.json(contact);
  });
  // const id = Number(request.params.id);
  // if (id <= persons.length) {
  //   const person = persons.filter((person) => person.id == id);
  //   response.json(person);
  // } else {
  //   return response.sendStatus(404);
  // }
});

personRouter.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  if (id) {
    persons = persons.filter((person) => person.id !== id);
    response.sendStatus(204);
  } else {
    return response.sendStatus(404);
  }
});

personRouter.post("/api/persons/", (request, response) => {
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
  const person = new Contact({
    name: body.name,
    number: body.number,
  });
  persons.push(person);
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

export default personRouter;
