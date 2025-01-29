import { useEffect, useState } from "react";
import { PersonType } from "./types/PersonType";
import { Filter } from "./components/Filter";
import { AddForm } from "./components/AddForm";
import { Persons } from "./components/Persons";
import notesServices from "./services/notesServices";
import "./index.css";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([] as PersonType[]);
  const [filter, setFilter] = useState("" as string);
  const [resultMessage, setResultMessage] = useState(null as string | null);
  const [type, setType] = useState(null as string | null);

  useEffect(() => {
    notesServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updatePersonNumber = (
    id: number,
    number: string,
    updatedPersonNumber: PersonType
  ) => {
    notesServices
      .update(id, { ...updatedPersonNumber, number })
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : updatedPerson))
        );
      });
  };

  const addPerson = (name: string, number: string) => {
    if (persons.some((person) => person.name === name)) {
      if (
        window.confirm(
          `${name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find((person) => person.name === name);
        if (personToUpdate) {
          updatePersonNumber(personToUpdate?.id, number, personToUpdate);
          setResultMessage(`${personToUpdate.name}'s number has been updated`);
          setType("success");
          setTimeout(() => {
            setResultMessage(null);
            setType(null);
          }, 5000);
        }
      }
      return;
    }

    const personObject = {
      name,
      number,
    };

    notesServices.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      // setPersons([...persons, personObject]);

      setResultMessage(`Added ${returnedPerson.name}`);
      setType("success");
      setTimeout(() => {
        setResultMessage(null);
        setType(null);
      }, 5000);
    });
  };

  const deletePerson = (id: number) => {
    if (window.confirm("Do you really want to leave?")) {
      notesServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          const person = persons.find((person) => person.id == id);
          if (person) {
            setResultMessage(`${person.name} has already been removed from server`);
            setType("error");
            setTimeout(() => {
              setResultMessage(null);
              setType(null);
            }, 5000);
          }
        });
    }
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
      setPersons(persons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={resultMessage} type={type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add new</h2>
      <AddForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
