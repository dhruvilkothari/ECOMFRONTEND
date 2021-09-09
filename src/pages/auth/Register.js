import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function Register({ history }) {
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const [email, setEmail] = useState("kotharidhruvil3@gmail.com");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    if (!email) {
      return toast.error("Email Address Required");
    }

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}.Click on the link to complete registration`
    );
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const registrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="email"
        className="form-control"
        placeholder="Enter your email "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-raised mt-3">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registrationForm()}
        </div>
      </div>
    </div>
  );
}

export default Register;
