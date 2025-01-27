import { PersonType } from "../types/PersonType";

export const PersonLine = ({
  person,
  handleDelete,
}: {
  person: PersonType;
  handleDelete: () => void;
}) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={handleDelete}>Delete</button>
    </p>
  );
};
