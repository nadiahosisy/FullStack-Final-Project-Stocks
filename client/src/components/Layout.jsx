import Footer from "./Footer";
import { NavBar } from "./NavBar";
// Import Footer component here once it's created

const Layout = ({ children }) => {
  return (
    <>
      <>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </>
    </>
  );
};

export default Layout;
