import React from "react";
import UserNav from "../../components/Nav/UserNav";

function Wishlist() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">user wishlst Page</div>
      </div>
    </div>
  );
}

export default Wishlist;
