import React from "react";

const Alert = ({ message, sentiment }) => (
  <div class={`alert alert-${sentiment} mb-0`} role="alert">
    {message}
  </div>
);

export default Alert;
