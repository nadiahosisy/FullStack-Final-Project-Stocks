import React from "react";

const Modal = ({ show, message, onClose, iconType }) => {
  if (!show) return null;

  const iconPath =
    iconType === "success" ? "/icons/check.png" : "/icons/error.png";

  return (
    <div className="modal-overlay">
      <div className="modal">
        {iconType && (
          <img src={iconPath} alt={iconType} className="modal-icon" />
        )}
        <h2>{message}</h2>
        <button className="close-btn-modal" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
