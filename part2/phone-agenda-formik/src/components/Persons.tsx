import { PersonType } from "../types/PersonType";
import { PersonLine } from "./PersonLine";

export const Persons = ({
  persons,
  handleDelete,
}: {
  persons: PersonType[];
  handleDelete: (id: number) => void;
}) => {
  const handleDeletePerson = (id: number) => {
    handleDelete(id);
  };
  return (
    <>
      {persons.map((person) => (
        <PersonLine
          person={person}
          key={person.id}
          handleDelete={() => handleDeletePerson(person.id)}
        />
      ))}
    </>
  );
};
