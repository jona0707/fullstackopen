import { Part } from "../types/PartTypes";

export const Total = ({ parts }: { parts: Part[] }) => {
  let total = parts.reduce((sum, current) => sum + current.exercises, 0);
  return (
    <div>
      <p>
        <strong>total of {total} exercises.</strong>
      </p>
    </div>
  );
};
