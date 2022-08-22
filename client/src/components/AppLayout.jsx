import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// import "../style/appLayout.css";

export default function AppLayout() {
  const { user, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <div className="title">
      <Link to={`/`}>
        <h1>Best House</h1>
      </Link>
      </div>
      <div className="header">
      <div>Welcome 👋 {user.name} </div>
        <nav className="menu">
          <ul className="menu-list">
            <li>
              <Link to="/app">Profile</Link>
            </li>
            <li>
              <Link to="/app/properties">Properties</Link>
            </li>
            {/* <li>
              <Link to="/app/debugger">Auth Debugger</Link>
            </li> */}
            <li>
              <button
                className="exit-button"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                LogOut
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
