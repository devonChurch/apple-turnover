import React from "react";

const Thumbnail = ({ source, altText, title, onClick, isSelected }) => (
  <div className="card">
    <img className="card-img-top" src={source} alt={altText} />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>

      <button
        onClick={onClick}
        type="button"
        className="btn btn-outline-primary btn-sm"
        disabled={isSelected}
      >
        Select
      </button>
    </div>
  </div>
);

export default Thumbnail;
