import React, { useState } from "react";
import EmojiButton from "./EmojiButton";
import { purchaseStocks } from "../../api/apiServices"; // Adjust the import path as needed

const BalanceModal = ({ show, stockName, balance, lastPrice, onClose }) => {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");

  if (!show) return null;

  const handleQuantityChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10) || 0);
    if (value * lastPrice > balance) {
      setError("Insufficient balance for this quantity");
    } else {
      setError("");
    }
    setQuantity(value);
  };

  const handleBuy = async () => {
    if (quantity * lastPrice > balance) {
      setError("Insufficient balance");
      return;
    }

    try {
      const userId = "your-user-id"; // Replace with the actual user ID
      const updatedBalance = await purchaseStocks(
        userId,
        stockName,
        quantity,
        quantity * lastPrice
      );

      console.log(`New balance after purchase: ${updatedBalance}`);
      onClose(); // Close the modal or handle UI update
    } catch (error) {
      console.error("Error during purchase:", error);
      setError("Failed to complete the purchase. Please try again.");
    }
  };

  return (
    <div className="balance-modal-div">
      <div className="modal-div">
        <h2 className="header-stock-name">Stock Name: {stockName}</h2>
        <p className="paragraph-balance">Balance: ${balance}</p>
        <p className="paragraph-last-price">Last Price: ${lastPrice}</p>

        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          {error && <p className="error-message">{error}</p>}
        </div>

        <button className="buy-btn" onClick={handleBuy}>
          Buy
        </button>
        <EmojiButton />
        <button className="close-btn-balance-modal" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default BalanceModal;
