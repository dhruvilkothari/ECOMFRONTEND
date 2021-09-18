import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";

const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  price: "45000",
  category: "",
  categories: [],
  subs: [],
  shipping: "Yes",
  quantity: "50",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "HP", "ASUS"],
  color: "White",
  brand: "Apple",
};

function ProductCreate() {
  const [subOptions, setSubsOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((c) => {
        setValues({ ...values, categories: c.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value)
      .then((res) => {
        console.log(res);
        setSubsOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
    setShowSub(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    createProduct(values, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        // if (res.status === 400) {
        //   return toast.err("Already submitted");
        // }

        window.alert(`${res.data.title} created successfully`);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        // if (err.response.status === 400) {
        //   toast.error(err.response.data);
        // }
        toast.error(err.response.data.err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create</h4>
          {/* {JSON.stringify(values.subs)} */}

          <hr />
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            loading
            setLoading={setLoading}
            handleCategoryChange={handleCategoryChange}
            setSubsOptions={setSubsOptions}
            showSub={showSub}
            subOptions={subOptions}
            setValues={setValues}
          />
          {/* {JSON.stringify(values.categories)} */}
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
