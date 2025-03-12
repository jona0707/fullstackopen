import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

export const CreateAnecdote = () => {
  const dispatch = useDispatch();
  const handleAdAnecdote = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const content = target.anecdote.value;
    dispatch(addAnecdote(content));
    target.anecdote.value = "";
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAdAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
