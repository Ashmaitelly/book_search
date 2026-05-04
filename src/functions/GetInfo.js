import axios from "axios";

export const GetInfo = async (uri) => {
  try {
    let res = await axios.get(uri);
    return res;
  } catch (err) {
    throw new Error(err.response.data.error.message);
  }
};
