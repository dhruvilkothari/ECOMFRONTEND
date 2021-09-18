import axios from "axios";
export const createProduct = async (product, authtoken) => {
  // console.log("IN login.js", authtoken);
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};
