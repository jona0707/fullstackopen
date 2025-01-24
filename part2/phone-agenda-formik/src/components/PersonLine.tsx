import { PersonType } from "../types/PersonType";

export const PersonLine = ({ person }: { person: PersonType }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};
