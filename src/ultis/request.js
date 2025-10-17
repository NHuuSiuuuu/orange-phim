import axios from "axios";

const API_DOMAIN = `https://ophim1.com/v1/api/`;

// export const get = async (path) => {
//     const response = await fetch(API_DOMAIN + path)
//     const result = await response.json();
//     return result
// }
const request = axios.create({
  baseURL: API_DOMAIN,  //https://ophim1.com/v1/api/
});

export const getFromApi = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};
export default request;
