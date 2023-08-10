import React from "react";
import { useSelector } from "react-redux";

function SavedModal({ open  }) {

  if (!open) return null;
  return (
    <>
      <div>Hello</div>
      <button >close</button>
    </>
  );
}

export default SavedModal;
