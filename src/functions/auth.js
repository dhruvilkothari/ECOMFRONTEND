import axios from "axios";
export const createOrUpdateUser = async (authtoken) => {
  // console.log("IN login.js", authtoken);
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
