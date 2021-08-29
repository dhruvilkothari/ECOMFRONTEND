import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
function ForgotPassword({ history }) {
  const [email, setEmail] = useState("kotharidhruvil3@gmail.com");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: "http://localhost:3000/login",
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setLoading(false);
        setEmail("");
        toast.success("Reset Password Link  send to your email address");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.messages);
      });
    // history.push("/login");
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <h4>Forgot Password</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your Email"
          className="form-control"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-raised mt-3" disabled={!email}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
