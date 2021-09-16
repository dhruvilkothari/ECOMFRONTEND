import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import {
  GoogleOutlined,
  LoadingOutlined,
  MailOutlined,
} from "@ant-design/icons";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { auth, googleAuthProvider } from "../../firebase";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
// const createOrUpdateUser = async (authtoken) => {
// console.log("IN login.js", authtoken);
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

function Login({ history }) {
  const rolebasedredirect = (res) => {
    // alert(res.data.role);
    console.log(res.data.role);
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else if (res.data.role === "subscriber") {
      history.push("/user/history");
    }
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("kotharidhruvil3@gmail.com");
  const [password, setPassword] = useState("12345678");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      setLoading(false);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
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
          rolebasedredirect(res);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error(e.message);
    }
  };
  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <br />
        <div className="form-group">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        <br />
        <Button
          onClick={handleSubmit}
          icon={loading ? <LoadingOutlined /> : <MailOutlined />}
          type="primary"
          className="mb-3"
          block
          shape="round"
          size="large"
          disabled={!email || password.length < 6}
        >
          {loading ? "Loading....." : "Login with email and password"}
        </Button>
      </form>
    );
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        // console.log("In login line 88", user, idTokenResult.token);
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            console.log(res);
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
            rolebasedredirect(res);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      })
      .catch((er) => {
        console.log(er);
        toast.error(er.message);
      });
    history.push("/");
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6  offset-md-3">
          <h4>Login</h4>
          {loginForm()}
          <Button
            onClick={googleLogin}
            icon={<GoogleOutlined />}
            type="danger"
            className=""
            block
            shape="round"
            size="large"
          >
            Login with Google Account
          </Button>
          <br />
          <Link to="/forgot/password" className="text-danger float-end mt-3">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
