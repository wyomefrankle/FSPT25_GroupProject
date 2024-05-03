import React from "react";
import { Link } from 'react-router-dom';

export default function saveFavoriteModal({ launchBtnText, modalTitle, recommendation, handleSaveFavorite }) {
  return (
    <div className="m-3">
      <button
        type="button"
        className="save-recipe"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => handleSaveFavorite(recommendation)}
      >
        {launchBtnText}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {modalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}