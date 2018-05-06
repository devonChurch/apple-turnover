import React from "react";

const Navigation = ({ auth }) => (
  <nav className="navbar navbar-dark bg-primary">
    <button
      onClick={() => auth.signOut()}
      type="button"
      className="btn btn-outline-light btn-sm"
    >
      Signout
    </button>
  </nav>
);

export default Navigation;
