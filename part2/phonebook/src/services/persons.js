import axios from "axios";
const dbUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(dbUrl);
  return request.then((response) => response.data);
};
const create = (person) => {
  const request = axios.post(dbUrl, person);
  return request.then((response) => response.data);
};
const update = (id, person) => {
  const request = axios.put(`${dbUrl}/${id}`, person);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${dbUrl}/${id}`);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, deletePerson };
