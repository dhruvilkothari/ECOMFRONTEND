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

const { SubMenu, Item } = Menu;

function Header() {
  const history = useHistory();
  const [current, setCurrent] = useState("");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = async () => {};

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home </Link>
      </Item>

      <Item key="register" icon={<UserAddOutlined />} className="float-end">
        <Link to="/register">Register</Link>
      </Item>

      <Item className="float-end" key="login" icon={<UserOutlined />}>
        <Link to="/login">Login</Link>
      </Item>

      <SubMenu
        className="float-end"
        key="SubMenu"
        icon={<SettingOutlined />}
        title="username"
      >
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Item>
      </SubMenu>
    </Menu>
  );
}

export default Header;
