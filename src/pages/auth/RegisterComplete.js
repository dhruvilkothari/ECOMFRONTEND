import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";

function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please enter a valid email and Password");
    }
    if (password.length < 6) {
      toast.error("password must be at least 6 characters");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log("In register Complete ", result);
      if (result.user.emailVerified) {
        // remove user from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get userIDtoken
        let user = await auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        console.log("in register Complete in line 23", idTokenResult.token);
        // redux

        // redirect
        // history.push("/");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);
  const completeRegistrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="password"
            autoFocus
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />
        <button
          type="submit"
          className="btn btn-raised"
          disabled={!email || !password}
        >
          Complete Registration
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6  offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;