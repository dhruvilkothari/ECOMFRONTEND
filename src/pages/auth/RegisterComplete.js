import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
// import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";

// const createOrUpdateUser = async (authtoken) => {
//   // console.log("IN login.js", authtoken);
//   return await axios.post(
//     `${process.env.REACT_APP_API}/create-or-update-user`,
//     {},
//     {
//       headers: {
//         authtoken: authtoken,
//       },
//     }
//   );
// };

function RegisterComplete({ history }) {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => ({ ...state }));
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
        // console.log("in register Complete in line 23", idTokenResult.token);
        // redux
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            // console.log("IN register Complete", res);
            // console.log(res);
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
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });

        // redirect
        history.push("/");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);
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
