import { Part } from "./PartTypes";

export interface CourseProps {
    id: number;
    name: string;
    parts: Part[];
}