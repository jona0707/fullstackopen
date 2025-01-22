import { Part } from "../types/PartTypes";

export const Content = ({ parts }: { parts: Part[] }) => {
  return (
    <div>
      {parts.map(({ name, exercises, id }) => (
        <p key={id}>
          {name} {exercises}
        </p>
      ))}
    </div>
  );
};
