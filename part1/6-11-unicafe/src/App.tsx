import { useState } from "react";
import { ButtonProps } from "./types/ButonTypes";
import { StatisticsLineProps, StatisticsProps } from "./types/StatisticsTypes";

const Button = ({ onClick, text }: ButtonProps) => (
  <button onClick={onClick}>{text}</button>
);

const StatisticsLine = ({ text, value }: StatisticsLineProps) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

export const Statistics = ({
  good = 0,
  neutral = 0,
  bad = 0,
}: StatisticsProps) => {
  let total = good + neutral + bad;
  let average = (good - bad) / total;
  let positive = (good / total) * 100;
  return total === 0 ? (
    <p>No feedback given</p>
  ) : (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGoodClick = () => setGood(good + 1);
  const onNeutralClick = () => setNeutral(neutral + 1);
  const onBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={onGoodClick} text="good" />
      <Button onClick={onNeutralClick} text="neutral" />
      <Button onClick={onBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
