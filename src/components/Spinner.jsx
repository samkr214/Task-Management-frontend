import React from "react";
export default function Spinner({ text = "Loading..." }) {
  return (
    <div className="state-box" role="status">
      <span className="spinner" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}