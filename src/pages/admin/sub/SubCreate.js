import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { createSub, getSubs, removeSub, getSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryFrom from "../../../components/forms/CategoryFrom";
import LocalSearch from "../../../components/forms/LocalSearch";
function SubCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [category, setCategory] = useState("");
  // searching
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
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
  const loadSubs = () => {
    getSubs()
      .then((s) => {
        setSubs(s.data);
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          loadSubs();
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

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(name);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        loadSubs();

        setName("");

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
          <h4>Create SubCategory</h4>
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
                setCategory(e.target.value);
              }}
              name="category"
              className="form-control"
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {/* input field */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subs.filter(searched(keyword)).map((s) => {
            return (
              <div key={s._id} className="alert alert-dark">
                {s.name}
                <span className=" btn-sm float-end ">
                  <DeleteOutlined
                    onClick={() => {
                      handleRemove(s.slug);
                    }}
                    style={{ cursor: "pointer" }}
                    className="text-danger cursor-pointer "
                  />
                </span>
                <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
