import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Layout: React.FC = () => {
  return (
    <div className=" w-full">
      <Header />
      <main className=" w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
