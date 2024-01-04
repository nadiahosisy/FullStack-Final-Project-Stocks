import Footer from "./Footer";
import { NavBar } from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <NavBar />
      <main>
        {/* <div className="grid-container">{children}</div> */} {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
