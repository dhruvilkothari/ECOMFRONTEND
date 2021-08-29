import React, { useState } from "react";
import { useSelector, useEffect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import firebase from "firebase";

const { SubMenu, Item } = Menu;

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const logout = async () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined />} className="float-end">
        <Link to="/register">Register </Link>
      </Item>
      <Item key="login" icon={<UserOutlined />} className="float-end">
        <Link to="/login">Login </Link>
      </Item>

      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
        <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default Header;
