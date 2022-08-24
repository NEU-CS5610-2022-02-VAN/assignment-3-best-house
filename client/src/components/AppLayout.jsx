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
        <h3 className="menuTxt">Welcome! User: {user.name}</h3>
        <h3 className="menuTxt"><Link to="/app/properties">Properties</Link></h3>
        <h3 className="menuTxt"><Link to="/app">Profile</Link></h3>
        <button
          className="btn btn-hero box3"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          LogOut
        </button>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
