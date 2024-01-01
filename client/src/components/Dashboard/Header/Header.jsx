import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import UnderlineInput from "./UnderLineInput";

// eslint-disable-next-line react/prop-types
function Header({ OpenSidebar, onInputChangeDashboard, onButtonClick }) {
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
        <BsSearch className="icon" style={{ background: "rgb(7, 12, 39)" }} />
        <UnderlineInput
          onInputChange={(value) => onInputChangeDashboard(value)}
          onButtonClick={onButtonClick}
        />
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default Header;