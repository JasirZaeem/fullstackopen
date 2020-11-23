const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("build"));

morgan.token("person", function (req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(morgan(":method :url :status :response-time ms :person"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/info", (req, res) => {
  const d = new Date();
  const responseBody = `
  <p>
  Phonebook has info for ${persons.length} ${
    persons.length === 1 ? "person" : "people"
  }
  </p>
  <p>${d.toDateString()} ${d.toTimeString()}</p>`;

  res.send(responseBody);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const requestedId = Number(req.params.id);
  const person = persons.find(({ id }) => id === requestedId);
  if (person) {
    res.json();
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const requestedId = Number(req.params.id);
  persons = persons.filter(({ id }) => id !== requestedId);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res
      .status(400)
      .json({ error: "name and number are required fields" })
      .end();
  }

  if (persons.some(({ name: existingName }) => existingName === name)) {
    return res.status(409).json({ error: "name must be unique" }).end();
  }

  const newPerson = {
    id: Math.floor(Math.random() * 10000),
    name,
    number,
  };

  persons = [...persons, newPerson];

  res.status(201).json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
