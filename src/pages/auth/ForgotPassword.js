import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import { Button } from "antd";

function ForgotPassword({ history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [email, setEmail] = useState("kotharidhruvil3@gmail.com");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);
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
        setEmail("");
        setLoading(false);
        toast.success("Check Your message for ForgotPassword Link");
      })
      .catch((er) => {
        setLoading(false);
        toast.error(er.message);
        console.log("IN FORGOT PASSWORD RESET LINE 24", er);
      });
  };
  return (
    <div className="container col-md-6 p-5">
      <h4>Forgot Password</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoFocus
        />
        <br />
        <button
          className={loading ? "btn btn-primary" : "btn btn-raised"}
          disabled={!email}
        >
          {loading ? "Loading ...." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
