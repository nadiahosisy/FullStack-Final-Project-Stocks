import {
  BsFillBarChartFill,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  const handleNavigateProfile = () => {
    navigate("/myStocks/profile");
  };
  const handleNavigateDashbard = () => {
    navigate("/myStocks/myStocks");
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand" style={{ alignItems: "center" }}>
          <BsFillBarChartFill className="icon_header" /> My Dashboard
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item" onClick={handleNavigateProfile}>
          <BsFillArchiveFill className="icon" /> Profile
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
