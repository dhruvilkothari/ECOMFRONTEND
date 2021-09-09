import axios from "axios";
export const createOrUpdateUser = async (authtoken) => {
  console.log("Creating or PASSWORD");
  return await axios.post(
    process.env.REACT_APP_API,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
