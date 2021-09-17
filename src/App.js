import Header from "../src/components/Nav/Header";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "../src/pages/auth/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import UserRoute from "../src/components/routes/UserRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "../src/pages/admin/category/CategoryCreate";
function App() {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // console.log("in App.js line 19", user);
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            // console.log("IN register Complete", res);
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
      }
    });
    // clean up
    return () => unsubscribe();
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
        <UserRoute path="/user/wishlist" exact component={Wishlist} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={CategoryCreate} />
      </Switch>
    </>
  );
}

export default App;
