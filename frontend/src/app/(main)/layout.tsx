import UIFooter from "@/components/global/Footer";
import FrauditsSidebar from "@/components/global/FrauditsSidebar";
import UINavbar from "@/components/global/Navbar";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Toaster />
      {/* <UINavbar /> */}
      <div className="flex">
        <FrauditsSidebar />
        {children}
      </div>
      <UIFooter />
    </div>
  );
};

export default MainLayout;
