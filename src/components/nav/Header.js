import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  const [current, setCurrent] = useState("home");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = async (_) => {
    await firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        {!user && (
          <Item key="login" icon={<UserOutlined />} className="float-end">
            <Link to="/login">Login</Link>
          </Item>
        )}
        {!user && (
          <Item key="register" icon={<UserAddOutlined />} className="float-end">
            <Link to="/register">Register</Link>
          </Item>
        )}
        {user && (
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title={user && user.email.split("@")[0]}
            className="float-end"
          >
            {/*  <Item key="setting:1">Dashboard</Item> */}

            {user && user.role === "subscriber" && (
              <Item>
                <Link to="/user/history">Dashboard</Link>
              </Item>
            )}

            {user && user.role === "admin" && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}

            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}
      </Menu>
    </>
  );
};

export default Header;
