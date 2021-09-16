import React from "react";
import { Link } from "react-router-dom";
function UserNav() {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/user/history" className="nav-link">
            History
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user/password" className="nav-link">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user/wishlist" className="nav-link">
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;