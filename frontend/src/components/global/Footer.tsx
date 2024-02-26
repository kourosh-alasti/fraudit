import React from "react";

const UIFooter = () => {
  return (
    <div className="w-screen absolute bottom-0 md:flex hidden py-2 px-4">
      <div className="flex-1 flex justify-end">
        <p>Copyright © Fraudit 2024</p>
      </div>
      <div className="flex-1 flex gap-10 justify-end">
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
      </div>
    </div>
  );
};

export default UIFooter;
