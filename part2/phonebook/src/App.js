import React, { useState } from "react";

const PersonForm = ({
  handleAddContact,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => {
  return (
    <form onSubmit={handleAddContact}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <br />
        number:{" "}
        <input
          type={"tel"}
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ person: { name, number } }) => {
  return (
    <p key={name}>
      {name} {number}
    </p>
  );
};

const Filter = ({ query, setQuery, persons }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      {query ? (
        <div>
          {persons.map((person) =>
            person.name.toLowerCase().includes(query.toLowerCase()) ? (
              <Person person={person} />
            ) : null
          )}
        </div>
      ) : null}
    </div>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person person={person} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  const handleAddContact = (event) => {
    event.preventDefault();

    if (persons.some(({ name }) => name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter query={query} setQuery={setQuery} persons={persons} />

      <h2>add a new</h2>

      <PersonForm
        handleAddContact={handleAddContact}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} />
    </div>
  );
};

export default App;
