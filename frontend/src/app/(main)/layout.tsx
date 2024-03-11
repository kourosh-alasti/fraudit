import UIFooter from "@/components/global/Footer";
import UINavbar from "@/components/global/Navbar";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-1 flex-col w-full">
        <Toaster />
        <UINavbar />
        <div className="px-8 w-full">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
