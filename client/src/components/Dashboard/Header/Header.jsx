import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import UnderlineInput from "./UnderLineInput";
import { useAuth } from "../../../context/AuthProvider";

function Header({ OpenSidebar, onInputChangeDashboard, onButtonClick }) {
  const { userData } = useAuth();

  const userBalance = userData ? userData.balance : 0;

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div
        className="header-left"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "3px",
          boxShadow: "rgb(39, 44, 72)",
        }}
      >
        <BsSearch className="icon" />
        <UnderlineInput
          onInputChange={(value) => onInputChangeDashboard(value)}
          onButtonClick={onButtonClick}
        />
      </div>
      <div className="balance-display">
        <div className="balance-div">
          <h3>Balance</h3>
          <h3 className="balance-amount">1000$</h3>
        </div>

        {/* <div className="stock-purchase">
          <select
            id="stockPercentage"
            name="stockPercentage"
            className="select-percentage"
            // onChange={handleStockPurchase}
          >
            <option className="option" value="0">
              Select Percentage
            </option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
            <option value="40">40%</option>
            <option value="50">50%</option>
          </select>
        </div> */}
      </div>
    </header>
  );
}

export default Header;
