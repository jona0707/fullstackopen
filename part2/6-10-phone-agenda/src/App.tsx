import { useState } from "react";
import { PersonType } from "./types/PersonType";
import { Filter } from "./components/Filter";
import { AddForm } from "./components/AddForm";
import { Persons } from "./components/Persons";
const agenda: PersonType[] = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];
const App = () => {
  const [persons, setPersons] = useState(agenda as PersonType[]);
  const [newName, setNewName] = useState("" as string);
  const [newNumber, setNewNumber] = useState("" as string);
  const [filter, setFilter] = useState("" as string);

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook!!`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handlePersonNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewName(event.target.value);
  };

  const handlePersonNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    if (event.target.value !== "") {
      setPersons(
        persons.filter((person) =>
          person.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    } else {
      setPersons(agenda);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add new</h2>
      <AddForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonNameChange={handlePersonNameChange}
        handlePersonNumberChange={handlePersonNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
