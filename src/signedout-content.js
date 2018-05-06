import React from "react";

const SignedoutContent = ({ auth }) => (
  <main>
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-sm">
          <h1 className="display-4">Hello,</h1>
          <p>Please signin.</p>
          <button
            onClick={() => auth.getSession()}
            type="button"
            className="btn btn-primary"
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  </main>
);

export default SignedoutContent;
