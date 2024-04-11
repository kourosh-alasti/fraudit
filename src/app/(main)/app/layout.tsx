import { AppBar } from "@/components/app-bar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="flex h-full w-full flex-1 flex-col">
        <AppBar />
        <div className="h-full w-full px-8">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
