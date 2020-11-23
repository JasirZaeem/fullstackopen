import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import "./index.css";

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

const Person = ({ person: { id, name, number }, removePerson }) => {
  return (
    <p>
      {name} {number}
      <button
        onClick={() => {
          removePerson(id, name);
        }}
      >
        delete
      </button>
    </p>
  );
};

const Filter = ({ query, setQuery, persons, removePerson }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      {query ? (
        <div>
          {persons.map((person) =>
            person.name.toLowerCase().includes(query.toLowerCase()) ? (
              <Person
                key={person.id}
                person={person}
                removePerson={removePerson}
              />
            ) : null
          )}
        </div>
      ) : null}
    </div>
  );
};

const Persons = ({ persons, removePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} removePerson={removePerson} />
      ))}
    </div>
  );
};

const Toast = ({ toast }) => {
  return <div className={`toast ${toast.type}`}>{toast.message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");
  const [toasts, setToasts] = useState([]);
  const [toastId, setToastId] = useState(0);

  const getPersons = () => {
    personService.getAll().then((data) => setPersons(data));
  };

  useEffect(getPersons, []);

  const createToast = (toast, time) => {
    const newId = toastId + 1;
    setToastId(newId);
    console.log(newId);
    setToasts([...toasts, { ...toast, id: newId }]);
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newId)
      );
    }, time);
  };

  const handleAddContact = (event) => {
    event.preventDefault();

    if (
      persons.some(({ name }) => name.toLowerCase() === newName.toLowerCase())
    ) {
      const shouldReplaceNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (shouldReplaceNumber) {
        const { id } = persons.find(
          ({ name }) => name.toLowerCase() === newName.toLowerCase()
        );
        personService
          .update(id, { id, name: newName, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            createToast(
              {
                visible: true,
                message: `Updated '${updatedPerson.name}'`,
                type: "success",
              },
              5000
            );
            setNewNumber("");
            setNewName("");
          })
          .catch((error) => {
            setPersons(persons.filter((value) => value.id !== id));
            createToast(
              {
                visible: true,
                message: `'${newName}' has already been deleted`,
                type: "danger",
              },
              5000
            );
          });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personService.create(newPerson).then((data) => {
      setPersons([...persons, data]);
      createToast(
        {
          visible: true,
          message: `Added '${data.name}'`,
          type: "success",
        },
        5000
      );
      setNewName("");
      setNewNumber("");
    });
  };

  const removePerson = (id, name) => {
    const shouldDeletePerson = window.confirm(`Delete ${name}`);
    if (shouldDeletePerson) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        createToast(
          {
            visible: true,
            message: `Removed '${name}'`,
            type: "danger",
          },
          5000
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}

      <Filter
        query={query}
        setQuery={setQuery}
        persons={persons}
        removePerson={removePerson}
      />

      <h2>add a new</h2>

      <PersonForm
        handleAddContact={handleAddContact}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} removePerson={removePerson} />
    </div>
  );
};

export default App;
