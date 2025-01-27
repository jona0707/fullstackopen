import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

type Object = { name: string; number: string; id?: number };

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject: Object) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id: number, newObject: Object) => {
    console.log("debug2", id, newObject);
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id: number) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, deletePerson };
