import React, { useState } from "react";
import EmojiButton from "./EmojiButton";
import { purchaseStocks } from "../../api/apiServices";
import { Button, Slider } from "@mui/material";
import { useAuth } from "../../context/AuthProvider";
import Modal from "../Modal/Modal";

const BalanceModal = ({ show, stockName, balance, lastPrice, onClose }) => {
  const [curValue, setCurValue] = useState(0);
  const [error, setError] = useState("");
  const [balanceValue, setBalanceValue] = useState(balance);
  const [newBalance, setNewBalance] = useState(0);
  const [total, setTotal] = useState(0);

  const { userData, updateUserData } = useAuth();

  const maxValue = parseInt(balance / lastPrice);

  // States for modal
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseModalMessage, setPurchaseModalMessage] = useState("");
  const [modalIconType, setModalIconType] = useState("success");

  if (!show) return null;

  function valueText(value) {
    const balanceToRemove = parseFloat(lastPrice * value).toFixed(2);
    setNewBalance(parseFloat(balance - balanceToRemove).toFixed(2));
    setCurValue(value);
    return `${value}`;
  }

  const handleSliderChange = (event, newValue) => {
    const balanceToRemove = parseFloat(lastPrice * newValue).toFixed(2);
    setTotal(balanceToRemove);
    setBalanceValue(parseFloat(balance - balanceToRemove).toFixed(2));
  };

  const submitBuy = async () => {
    if (curValue === 0) {
      setPurchaseModalMessage("You cannot buy 0 stocks.");
      setModalIconType("error");
      setShowPurchaseModal(true);
      return;
    }

    try {
      const userDataAfterPurchase = await purchaseStocks(
        userData._id,
        stockName,
        lastPrice,
        balanceValue,
        curValue
      );
      updateUserData(userDataAfterPurchase.data);
      setPurchaseModalMessage(
        `Successfully purchased ${curValue} shares of ${stockName}.`
      );

      setModalIconType("success");
      setShowPurchaseModal(true);
    } catch (error) {
      console.error("Error during purchase:", error);
      setPurchaseModalMessage("Error during purchase.");
      setModalIconType("error");
      setShowPurchaseModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowPurchaseModal(false);
    onClose(); // Close the BalanceModal as well
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
          Remaining Balance:{" "}
          <span style={{ color: "#ccac00", fontWeight: "800" }}>
            ${balanceValue}
          </span>
        </p>

        <Slider
          valueLabelDisplay="on"
          max={maxValue}
          getAriaLabel={() => "Amount"}
          onChange={handleSliderChange}
          getAriaValueText={valueText}
          style={{ color: "#2c3e50" }}
        />

        <p className="paragraph-amount">
          Amount of {stockName.toUpperCase()} stocks to buy:{" "}
          <span style={{ color: "green", fontWeight: "bolder" }}>
            {curValue}
          </span>
        </p>
        {error && <p className="error-message">{error}</p>}

        <p className="total-amount">
          Total:{" "}
          <span style={{ color: "green", fontWeight: "bolder" }}>${total}</span>
        </p>

        <Button className="buy-btn" variant="contained" onClick={submitBuy}>
          Buy
        </Button>
        <Button
          className="close-btn-balance-modal"
          variant="contained"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>

      <Modal
        show={showPurchaseModal}
        message={purchaseModalMessage}
        onClose={handleCloseModal}
        iconType={modalIconType}
      />
    </div>
  );
};

export default BalanceModal;
