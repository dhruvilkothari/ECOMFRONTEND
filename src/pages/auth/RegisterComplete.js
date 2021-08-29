import React, { useEffect, useState } from "react";
import { googleAuthProvider, auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if ( !password) {
    //   return toast.error("Email must be provided");
    // }
    if (!password || password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      console.log(email);
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //remove user email from localStorage
        window.localStorage.removeItem("emailForRegistration");
        // get  id token
        let user = await auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await await user.getIdTokenResult();
        console.log("user--->", user, "Token------>", idTokenResult.token);

        //  populate redux storage

        // redirect
        history.push("/");
      }
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };

  const CompleteRegisterForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Your email"
          className="form-control"
          disabled
        />
        <input
          type="password"
          className="form-control mt-3"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <button
          disabled={!password}
          type="submit"
          className="btn btn-raised mt-3 "
        >
          Complete Registration
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registration</h4>
          {CompleteRegisterForm()}
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
