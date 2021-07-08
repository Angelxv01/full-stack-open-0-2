// const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("build"));
// app.use(
//   morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, "content-length"),
//       "-",
//       tokens["response-time"](req, res),
//       "ms",
//       JSON.stringify(req.body),
//     ].join(" ");
//   })
// );

let people = [
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
  {
    id: 5,
    name: "Angel",
    number: "12-12-1234567",
  },
];

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/api/persons", (req, res) => res.json(people));
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${people.length} people</p><br>${Date()}`
  );
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!(name && number)) {
    return res.status(400).json({
      error: "Missing name or number",
    });
  }

  const nameExist = people.find((person) => person.name === name);
  if (nameExist) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const id = Math.floor(Math.random() * 10000);

  const person = {
    id,
    name,
    number,
  };

  people = people.concat(person);

  res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = people.find((person) => person.id === id);

  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  people = people.filter((person) => person.id !== id);

  res.status(204).end();
});

app.use((req, res) => res.status(404).send("invalid route"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
