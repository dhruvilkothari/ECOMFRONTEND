import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "antd";
import { useSelector, userDispatch } from "react-redux";
import axios from "axios";
import {
  GoogleOutlined,
  LoadingOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

function Login({ history }) {
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const [email, setEmail] = useState("kotharidhruvil3@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("in LOGIN.js ---->", email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      setLoading(false);
      // console.log("IN LOGIN.JS LINE 17 ---->", result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
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
    } catch (e) {
      console.log("IN LOGIN.JS line 31----->", e);
      toast.error(e.message);
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
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
            // console.log("in LOGIN.js line 56", er);
            // return;
          });
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("in LOGIN.js line 107", err.message);
      });
  };

  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          required
          type="email"
          className="form-control"
          placeholder="Enter your email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <br />
      <div className="form-group">
        <input
          required
          type="password"
          className="form-control"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* <button type="submit" className="btn btn-raised mt-3">
        Login
      </button> */}
      <br />
      <Button
        type="primary"
        shape="round"
        onClick={handleSubmit}
        className="mb-3"
        block
        icon={loading ? <LoadingOutlined /> : <MailOutlined />}
        size="large"
        disabled={!email || !password || password.length < 6 || loading}
      >
        Login With Email and Password
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>

          {LoginForm()}
          <Button
            type="danger"
            shape="round"
            icon={<GoogleOutlined />}
            block
            size="large"
            onClick={googleLogin}
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="float-end text-danger mt-1">
            Forgot your password ?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
