import { useSelector, useDispatch } from "react-redux";
import { Anecdote } from "../types/anecdote";
import { voteAnecdote } from "../reducers/anecdoteReducer";

export const AnecdoteList = () => {
  const anecdotes = useSelector((state: Anecdote[]) => state);
  const dispatch = useDispatch();
  const vote = (id: string) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote: Anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};
