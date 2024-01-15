import { React, useState } from "react";
import EmojiButton from "./EmojiButton";

const BalanceModal = ({ show, stockName, balance, onClose }) => {
  if (!show) return null;

  const [stockAmount, setStockAmount] = useState("");

  if (!show) return null;

  const handleAmountChange = (event) => {
    setStockAmount(event.target.value);
  };

  return (
    <div className="balance-modal-div">
      <div className="modal-div">
        <h2 className="header-stock-name">Stock Name: {stockName}</h2>
        <p className="paragraph-balance">Balance: ${balance}</p>

        <div className="stock-amount-input">
          <label htmlFor="stockAmount">Enter amount to buy:</label>
          <input
            type="number"
            id="stockAmount"
            value={stockAmount}
            onChange={handleAmountChange}
            min="1"
          />
        </div>

        <EmojiButton />
        <button className="close-btn-balance-modal" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default BalanceModal;
