import React, { useState, useEffect } from "react";
import axios from "axios";

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

const Person = ({ person: { id, name, number } }) => {
  return (
    <p key={id}>
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
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  const getPersons = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(({ data }) => setPersons(data));
  };

  useEffect(getPersons, []);

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
