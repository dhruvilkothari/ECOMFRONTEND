import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "../src/components/nav/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "../src/functions/auth";
import History from "./pages/user/History";
import UserRoute from "../src/components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "../src/pages/user/Password";
// import Wishlist from "./pages/user/Wishlist";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("IN APP.j line 18  ", user);
        // console.log("IN APP.j line 19 ", idTokenResult);
        currentUser(idTokenResult.token)
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
            console.log("in App.js line 37 ", er);
            // return;
          });
      }
    });
    return () => unSubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/forgot/password" exact component={ForgotPassword} />
        <UserRoute path="/user/history" exact component={History} />
        <UserRoute path="/user/password" exact component={Password} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
      </Switch>
    </>
  );
}

export default App;
