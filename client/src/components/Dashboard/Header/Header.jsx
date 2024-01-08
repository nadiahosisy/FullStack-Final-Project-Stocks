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
        </div>
        {/* <h1 className="balance-amount">{userBalance}$</h1> */}
        <h3 className="balance-amount">500$</h3>
      </div>
    </header>
  );
}

export default Header;
