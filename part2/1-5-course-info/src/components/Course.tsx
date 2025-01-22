import { CourseProps } from "../types/CourseTypes";
import { Content } from "./Content";
import { Header } from "./Header";
import { Total } from "./Total";

export const Course = ({ course }: { course: CourseProps }) => {
  const { name, parts } = course;
  return (
    <div>
      <Header name={name} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  );
};
