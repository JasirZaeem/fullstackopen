import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then(({ data }) => data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(({ data }) => data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(({ data }) => data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const personService = { getAll, create, update, remove };

export default personService;
