import { FilterProps } from "../types/FilterTypes";

export const Filter = ({ filter, handleFilterChange }: FilterProps) => {
  return (
    <form>
      <div>
        filter <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  );
};
