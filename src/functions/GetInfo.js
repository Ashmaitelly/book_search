import axios from "axios";

export const GetInfo = async (uri) => {
  try {
    let res = await axios.get(uri);
    return res;
  } catch (err) {
    const errorMessage =
      err.response?.data?.error?.message ||
      err.message ||
      "An unknown error occurred";
    throw new Error(errorMessage);
  }
};
