import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";

function ForgotPassword({ history }) {
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then((res) => {
        setLoading(false);
        setEmail("");
        toast.success("Check Your email for Your password link");
      })
      .catch((err) => {
        setLoading(false);
        console.error("In forgot password line 20", err);
        toast.error(err.message);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <h4>Forgot Password</h4>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          placeholder="Enter Your email"
        />
        <br />
        <button type="submit" className="btn btn-raised" disabled={!email}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
