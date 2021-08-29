import React, { useState } from "react";
import { googleAuthProvider, auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MailOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    // console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
    e.preventDefault();
    console.table(email, password);
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
          icon={<MailOutlined />}
        >
          Login
        </Button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {loginForm()}
        </div>
      </div>
    </div>
  );
}

export default Login;
