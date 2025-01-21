interface Part {
  name: string;
  exercises: number;
}
interface PartProps {
  parts: Part[];
}

//Tipado para recordar sin interfaz.
const Header = ({ course }: { course: string }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part }: { part: Part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }: PartProps) => {
  // console.log(parts);
  const [part1, part2, part3] = parts;
  return (
    <>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </>
  );
};

const Total = ({ parts }: PartProps) => {
  const [part1, part2, part3] = parts;
  return (
    <p>
      Number of exercises {part1.exercises + part2.exercises + part3.exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
