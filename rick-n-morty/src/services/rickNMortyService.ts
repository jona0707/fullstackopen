import axios from "axios";

const getCharacters = async (baseUrl: string) => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

export default { getCharacters };
