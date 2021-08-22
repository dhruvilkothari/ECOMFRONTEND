import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  // Only 12 cols are possible
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
    // console.log(
    //   process.env.REACT_APP_REGISTER_ ===
    //     "http://localhost:3000/register/complete"
    // );
    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success("Email has sent to your account");
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const resgisterForm = () => {
    return (
      <form className="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-raised mt-3" disabled={!email}>
          Register
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {resgisterForm()}
        </div>
      </div>
    </div>
  );
}

export default Register;
