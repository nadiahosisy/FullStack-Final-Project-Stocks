import React, { useEffect, useState } from "react";
import EmojiButton from "./EmojiButton";
import { purchaseStocks } from "../../api/apiServices";
import { Button, Slider } from "@mui/material";
import { useAuth } from "../../context/AuthProvider";

const BalanceModal = ({ show, stockName, balance, lastPrice, onClose }) => {
  const [curValue, setCurValue] = useState(0);
  const [error, setError] = useState("");
  const [balanceValue, setBalanceValue] = useState(balance);
  const [newBalance, seNewBalance] = useState(0);

  const { userData, updateUserData } = useAuth();

  const maxValue = parseInt(balance / lastPrice);

  if (!show) return null;
  function valueText(value) {
    const balanceToRemove = parseFloat(lastPrice * value).toFixed(2);
    seNewBalance(parseFloat(balanceValue - balanceToRemove).toFixed(2));
    setCurValue(value);
    return `${value}`;
  }

  const handleSliderChange = (event, newValue) => {
    const balanceToRemove = parseFloat(lastPrice * newValue).toFixed(2);
    setBalanceValue(parseFloat(balance - balanceToRemove).toFixed(2));
  };

  const submitBuy = async () => {
    const userDataAfterPurchase = await purchaseStocks(
      userData._id,
      stockName,
      lastPrice,
      balanceValue,
      curValue
    );
    console.log(userDataAfterPurchase.data);
    updateUserData(userDataAfterPurchase.data);
    onClose();
  };

  return (
    <div className="balance-modal-div">
      <div className="modal-div">
        <h2 className="header-stock-name">
          Stock Name: {stockName.toUpperCase()}
        </h2>
        <p className="paragraph-price" style={{ color: "black" }}>
          Current Price:{" "}
          <span style={{ color: "#ccac00", fontWeight: "800" }}>
            ${lastPrice}
          </span>
        </p>
        <p className="paragraph-balance">
          Remaning Balance:{" "}
          <span style={{ color: "#ccac00", fontWeight: "800" }}>
            ${balanceValue}
          </span>
        </p>

        <div>
          <Slider
            valueLabelDisplay="on"
            max={maxValue}
            getAriaLabel={() => "Amount"}
            onChange={handleSliderChange}
            getAriaValueText={valueText}
            style={{ color: "rgb(63, 189, 180)" }}
          />

          <p className="paragraph-amount">
            Amount of {stockName.toUpperCase()} stocks to buy:{" "}
            <span style={{ color: "green", fontWeight: "bolder" }}>
              {curValue}
            </span>
          </p>
          {error && <p className="error-message">{error}</p>}
        </div>

        <Button
          className="buy-btn"
          variant="contained"
          style={{ width: "50%", background: "rgb(63, 189, 180)" }}
          onClick={submitBuy}
        >
          Buy
        </Button>
        <EmojiButton />
        <Button
          style={{ width: "50%", background: "rgb(63, 189, 180)" }}
          className="close-btn-balance-modal"
          variant="contained"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BalanceModal;
