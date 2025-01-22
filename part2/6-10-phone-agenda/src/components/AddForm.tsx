import { AddFormProps } from "../types/AddFormTypes";

export const AddForm = ({
  addPerson,
  newName,
  newNumber,
  handlePersonNameChange,
  handlePersonNumberChange,
}: AddFormProps) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handlePersonNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
