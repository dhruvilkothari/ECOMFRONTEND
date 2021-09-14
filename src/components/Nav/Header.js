import React, { useState } from "react";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import firebase from "firebase";
import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase";

const { SubMenu, Item } = Menu;

function Header() {
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));
  // console.log("In Header line 21", user);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = async () => {
    firebase.auth().signOut();
    dispatch({ type: "LOGOUT", payload: null });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-end">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item className="float-end" key="login" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          className="float-end"
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
}

export default Header;
