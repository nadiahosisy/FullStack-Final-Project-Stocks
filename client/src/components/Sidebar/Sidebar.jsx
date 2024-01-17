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
import { FaRegChartBar, FaUser } from "react-icons/fa";
import { MdOutlineInventory, MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const { userData } = useAuth();

  const navigate = useNavigate();

  const handleNavigateProfile = () => {
    navigate("/myDashboard/profile");
  };
  const handleNavigateMyStocks = () => {
    navigate("/myDashboard/myStocks");
  };
  const handleNavigateDashboard = () => {
    navigate("/myDashboard/");
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
        <li className="sidebar-list-item" onClick={handleNavigateDashboard}>
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <>
          {userData.role === "Investor" && (
            <li className="sidebar-list-item" onClick={handleNavigateMyStocks}>
              <FaRegChartBar className="icon" /> My Stocks
              {/* Or <MdOutlineInventory className="icon" /> My Stocks */}
            </li>
          )}

          <li className="sidebar-list-item" onClick={handleNavigateProfile}>
            <FaUser className="icon" /> Profile
            {/* Or <MdAccountCircle className="icon" /> Profile */}
          </li>
        </>
      </ul>
    </aside>
  );
}

export default Sidebar;
