import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";
function AdminRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((result) => {
          //   console.log(result, "In Admin Route Line 13");
          setOk(true);
        })
        .catch((err) => {
          //   console.log(err, "In Admin Route Line 17");
          setOk(false);
        });
    }
  }, [user]);
  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
}

export default AdminRoute;
