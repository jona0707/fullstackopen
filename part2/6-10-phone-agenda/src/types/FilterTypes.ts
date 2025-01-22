export interface FilterProps {
  filter: string;
  // También valdría con () => void
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
