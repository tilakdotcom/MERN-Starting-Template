import Header from "./Header";
import { Outlet } from "react-router-dom";


const Layout = () => {
  
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Content specific to the route will be rendered here */}
      </main>
    </div>
  );
};

export default Layout;
