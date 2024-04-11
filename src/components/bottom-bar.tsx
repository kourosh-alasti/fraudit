import React from "react";

export const BottomBar = () => {
  return (
    <div className="absolute bottom-0 hidden w-screen px-4 py-2 md:flex">
      <div className="flex flex-1 justify-end">
        <p>Copyright © Fraudit 2024</p>
      </div>
      <div className="flex flex-1 justify-end gap-10">
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
      </div>
    </div>
  );
};
