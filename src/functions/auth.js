import axios from "axios";
export const createOrUpdateUser = async (authtoken) => {
  console.log("Creating or PASSWORD");
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

export const currentUser = async (authtoken) => {
  console.log("Creating or PASSWORD");
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
