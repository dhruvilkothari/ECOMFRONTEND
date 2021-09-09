import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";

function RegisterComplete({ history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);
  const [email, setEmail] = useState("kotharidhruvil3@gmail.com");
  const [password, setPassword] = useState("12345678");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email And Password must be provided");
      return;
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      //   console.log("COMPLETE REGISTRATION-------->", resutl);
      if (result.user.emailVerified) {
        //   remove user email
        window.localStorage.removeItem("emailForRegistration");
        // get userIdToken
        let user = await auth.currentUser;

        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        console.log("IN REGISTER COMPLET LINE 30 ", idTokenResult);

        // populate  redux

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            // console.log("in LOGIN.js  line 54---->", res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((er) => {
            console.log("in LOGIN.js line 56", er);
            // return;
          });
        history.push("/");
        // redirect
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const completRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="email"
        className="form-control"
        placeholder="Enter your email "
        value={email}
        disabled
      />
      <input
        required
        type="password"
        className="form-control mt-3"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-raised mt-3">
        Complete Registeration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Register </h4>

          {completRegistrationForm()}
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
