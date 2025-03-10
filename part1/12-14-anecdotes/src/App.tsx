import { useState } from "react";
import { ButtonProps } from "./types/ButtonTypes";

const Button = ({ onClick, text }: ButtonProps) => {
  return <button onClick={onClick}>{text}</button>;
};

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];
// Llenar de 0s.
const initialVotes = new Uint8Array(anecdotes.length);
const copy = [...initialVotes];

const DayAnecdote = ({ votes }: { votes: number[] }) => {
  let max = Math.max(...votes);
  let index = votes.indexOf(max);
  return (
    <div>
      <p>{anecdotes[index]}</p>
      <p>has {max} votes</p>
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(copy);

  const handleRandom = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };
  const handleVote = () => {
    copy[selected] += 1;
    setVotes([...copy]);
    console.log(votes);
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleRandom} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <DayAnecdote votes={votes} />
    </div>
  );
};

export default App;
