import React, { useState } from "react";
import { googleAuthProvider, auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MailOutlined,
  LoadingOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Login({ history }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("kotharidhruvil3@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const handleSubmit = async (e) => {
    // console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      setLoading(false);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      history.push("/");
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error(e.message);
    }
  };

  const googleLogin = async () => {
    setLoading1(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        setLoading1(false);
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });

        history.push("/");
      })
      .catch((er) => {
        setLoading1(false);
        console.log(er);
        toast.error(er.message);
      });
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your email"
            className="form-control"
            autoFocus
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Your Password"
            className="form-control"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!email || !password | (password.length < 6)}
          type="primary"
          className="mb-3 mt-3 "
          block
          shape="round"
          size="large"
          icon={loading === true ? <LoadingOutlined /> : <MailOutlined />}
        >
          {loading === true ? "Loading....." : "Login"}
        </Button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3 mt-3 "
            block
            shape="round"
            size="large"
            icon={loading === true ? <LoadingOutlined /> : <GoogleOutlined />}
          >
            {loading === true ? "Loading....." : "Login with Google"}
          </Button>
          <Link to="/forgot/password" className="float-end text-danger">
            forgot password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
