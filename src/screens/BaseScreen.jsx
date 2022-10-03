import { Outlet } from "react-router-dom";
import NavBar from "../components/layouts/NavBar";
import Footer from "../components/layouts/Footer"

const BaseScreen = () => {
  return (
    <div className="container-fluid">
      
      <NavBar/>
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default BaseScreen;
