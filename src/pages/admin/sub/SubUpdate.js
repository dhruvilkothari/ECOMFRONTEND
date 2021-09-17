import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  createSub,
  removeSub,
  getSub,
  updateSub,
} from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryFrom from "../../../components/forms/CategoryFrom";
import LocalSearch from "../../../components/forms/LocalSearch";
function SubUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSub();
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
  const loadSub = () => {
    getSub(match.params.slug)
      .then((s) => {
        setName(s.data.name);
        setParent(s.data.parent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // step 3 handleChange

  // step 4

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(name);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);

        setName("");

        toast.success(`${res.data.name} is updated`);
        history.push("/admin/sub");
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
          <h4>Update SubCategory</h4>
          <CategoryFrom
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            loading={loading}
          />

          <div className="form-group mt-3">
            <label className="mb-2">Parent Category</label>
            <select
              onChange={(e) => {
                setParent(e.target.value);
              }}
              name="category"
              className="form-control"
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {/* input field */}
        </div>
      </div>
    </div>
  );
}

export default SubUpdate;
