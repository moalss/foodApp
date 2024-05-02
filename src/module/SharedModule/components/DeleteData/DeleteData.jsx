import React from "react";
import noData from "../../../../assets/images/no-data.png";
export default function DeleteData({ item, deleteList }) {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-center">
          <img src={noData} alt="noData"></img>
          <p className="fw-bold">Delete this {item} ?</p>
          <p className="text-muted">
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </p>
          <button className="btn btn-success" onClick={deleteList}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
