import axios from "axios";
export const getCategories = async (authtoken) => {
  console.log("In Categories Section");
  return await axios.post(`${process.env.REACT_APP_API}/categories`);
};
export const getCategory = async (slug) => {
  console.log("In GETCategories Section");
  return await axios.post(`${process.env.REACT_APP_API}/category/${slug}`);
};
export const removeCategory = async (slug, authtoken) => {
  console.log("In Categories Section");
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  });
};

export const updateCategory = async (slug, category, authtoken) => {
  console.log("In Categories Section");
  return await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    category,
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

export const createCategory = async (category, authtoken) => {
  console.log("In Categories Section");
  return await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken: authtoken,
    },
  });
};
