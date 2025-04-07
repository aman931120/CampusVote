import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
