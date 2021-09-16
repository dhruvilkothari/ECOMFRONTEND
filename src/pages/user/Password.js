import React, { useState } from "react";
import UserNav from "../../components/Nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Password Updated");
        setPassword("");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      });
  };
  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your password</label>
        <input
          autoFocus
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          value={password}
          placeholder="Enter your new password"
          disabled={loading}
        />
        <br />
        <button
          disabled={loading || password.length < 6}
          type="submit"
          className="btn btn-primary"
        >
          {loading ? "Loading....." : "Submit"}
        </button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Password Update</h4>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
}

export default Password;
