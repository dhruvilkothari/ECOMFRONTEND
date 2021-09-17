import axios from "axios";
export const getSubs = async () => {
  // console.log("IN login.js", authtoken);
  return await axios.get(`${process.env.REACT_APP_API}/subs`);
};

export const getSub = async (slug) => {
  // console.log("IN login.js", authtoken);
  return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
};

export const removeSub = async (slug, authtoken) => {
  // console.log("IN login.js", authtoken);
  return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });
};
export const updateSub = async (slug, sub, authtoken) => {
  // console.log("IN login.js", authtoken);
  return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });
};

export const createSub = async (sub, authtoken) => {
  // console.log("IN login.js", authtoken);
  return await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
};
