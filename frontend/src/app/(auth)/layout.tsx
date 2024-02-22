// import UIFooter from "@/components/global/Footer";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {children}
      {/* <UIFooter /> */}
    </div>
  );
};

export default AuthLayout;
