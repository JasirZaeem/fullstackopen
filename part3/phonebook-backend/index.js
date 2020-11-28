require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("build"));

morgan.token("person", function (req) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(morgan(":method :url :status :response-time ms :person"));

app.get("/info", (req, res) => {
  const d = new Date();
  Person.count({}, function (err, count) {
    const responseBody = `
      <p>
      Phonebook has info for ${count} ${count === 1 ? "person" : "people"}
      </p>
      <p>${d.toDateString()} ${d.toTimeString()}</p>`;

    res.send(responseBody);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res
      .status(400)
      .json({ error: "name and number are required fields" })
      .end();
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson
    .save()
    .then((person) => {
      res.status(201).json(person.toJSON());
    })
    .catch(next);
});

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;

  console.info({ id, name, number });

  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.status(204).json(updatedPerson.toJSON());
      } else {
        res.status(404).json({ error: `${name} does not exist` });
      }
    })
    .catch(next);
});

app.use("*", (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    if (error?.errors?.name?.kind === "unique") {
      return res.status(409).json({ error: error.message });
    } else {
      return res.status(400).json({ error: error.message });
    }
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
