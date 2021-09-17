import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
  getCategories,
  getCategory,
  removeCategory,
} from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryFrom from "../../../components/forms/CategoryFrom";

function CategoryUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    getCategory(match.params.slug)
      .then((c) => {
        setName(c.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = async (slug) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(name);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);

        setName("");

        toast.success(`${res.data.name} updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data);
          // console.error(err);
        }
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Update Category</h4>
          <CategoryFrom
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            loading={loading}
          />
          <hr />
        </div>
      </div>
    </div>
  );
}

export default CategoryUpdate;
