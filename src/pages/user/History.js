import React from "react";
import UserNav from "../../components/Nav/UserNav";

function History() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">user History Page</div>
      </div>
    </div>
  );
}

export default History;
