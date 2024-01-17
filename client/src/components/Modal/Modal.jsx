import React from "react";
import checkImage from "../../assets/Icons/check.png";
import errorImage from "../../assets/Icons/error.png";

const Modal = ({ show, message, onClose, iconType }) => {
  if (!show) return null;

  const iconPath = iconType === "success" ? checkImage : errorImage;

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
