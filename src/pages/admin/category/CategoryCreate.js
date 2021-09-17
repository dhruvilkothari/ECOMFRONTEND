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
function CategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

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

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <button type="submit" className="btn  btn-outline-primary">
            {loading ? "Loading ....." : "Save"}
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Create Category</h4>
          {categoryForm()}
          <hr />
          {categories.map((c) => {
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
