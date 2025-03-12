import { CreateAnecdote } from "./components/CreateAnecdote";
import { AnecdoteList } from "./components/AnecdoteList";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <CreateAnecdote />
    </div>
  );
};

export default App;
