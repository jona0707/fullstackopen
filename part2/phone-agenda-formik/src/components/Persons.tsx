import { PersonType } from "../types/PersonType";
import { PersonLine } from "./PersonLine";

export const Persons = ({ persons }: { persons: PersonType[] }) => {
  return (
    <>
      {persons.map((person) => (
        <PersonLine person={person} key={person.id} />
      ))}
    </>
  );
};
