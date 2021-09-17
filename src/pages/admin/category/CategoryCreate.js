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
function CategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // searching
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((c) => {
        setCategories(c.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = async (slug) => {
    let ans = window.confirm(`Are you sure you want to remove ${slug} ?`);
    if (ans) {
      // alert(ans);
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          loadCategories();
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
            // console.error(err);
          }
        });
    }
  };
  // step 3 handleChange
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(name);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);

        setName("");
        loadCategories();
        toast.success(`${res.data.name} created`);
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
          <h4>Create Category</h4>
          <CategoryFrom
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            loading={loading}
          />
          {/* input field */}
          <input
            type="search"
            placeholder="Filter"
            value={keyword}
            className="form-control mb-4 mt-4"
            onChange={handleSearchChange}
          />

          <hr />
          {categories.filter(searched(keyword)).map((c) => {
            return (
              <div key={c._id} className="alert alert-dark">
                {c.name}
                <span className=" btn-sm float-end ">
                  <DeleteOutlined
                    onClick={() => {
                      handleRemove(c.slug);
                    }}
                    style={{ cursor: "pointer" }}
                    className="text-danger cursor-pointer "
                  />
                </span>
                <Link to={`/admin/category/${c.slug}`}>
                  <span className="btn-sm float-end">
                    <EditOutlined className="text-warning " />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryCreate;
