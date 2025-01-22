export interface AddFormProps {
  addPerson: (event: React.FormEvent<HTMLFormElement>) => void;
  newName: string;
  newNumber: string;
  handlePersonNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePersonNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
