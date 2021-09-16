import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

function Register({ history }) {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      return toast.error("Please enter a valid email");
    }
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    setLoading(false);
    toast.success(
      `Email has been sent to ${email}.Please check your email for Link`
    );
    // save user in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };
  const registrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          placeholder="Enter your email"
        />
        <br />
        <button type="submit" className="btn btn-raised">
          {loading ? "Loading....." : "Register"}
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6  offset-md-3">
          <h4>Registration</h4>
          {registrationForm()}
        </div>
      </div>
    </div>
  );
}

export default Register;
