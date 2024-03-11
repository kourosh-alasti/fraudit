"use client";

import { createContext, useState } from "react";

export const SidebarContext = createContext({
  toggled: false,
  toggleSidebar: (): void => {},
});

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggled, setToggled] = useState(false);

  function toggleSidebar() {
    setToggled(!toggled);
  }

  const sidebarCtx = {
    toggled: toggled,
    toggleSidebar: toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={sidebarCtx}>
      {children}
    </SidebarContext.Provider>
  );
}
