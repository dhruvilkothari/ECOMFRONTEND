import React, { useState } from "react";
import { googleAuthProvider, auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    // console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };
    auth
      .sendSignInLinkToEmail(email, config)
      .then(() => {
        toast.success(`Email Successfully send to ${email}`);
        window.localStorage.setItem("emailForRegistration", email);
        setEmail("");
      })
      .catch((err) => {
        toast.error(err.message);
        setEmail("");
      });
  };

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Your email"
          className="form-control"
          autoFocus
        />
        <button
          disabled={!email}
          type="submit"
          className="btn btn-raised mt-2 "
        >
          Register
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
}

export default Register;
