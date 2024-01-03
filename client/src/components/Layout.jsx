import Footer from "./Footer";
import { NavBar } from "./NavBar";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <>
        <NavBar />
        <main>
          <div className="grid-container">{children}</div>
        </main>
        <Footer />
      </>
    </>
  );
};

export default Layout;
