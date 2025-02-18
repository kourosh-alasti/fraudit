import Image from "next/image";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useSidebar } from "@/store/use-sidebar";
import { DrawerItems } from "./drawer-items";

export const SideDrawer = () => {
  const user = useUser();
  const { isOpen, close } = useSidebar();

  return (
    <Sidebar
      onBackdropClick={() => close()}
      toggled={isOpen}
      breakPoint="all"
      className={`ps-broken h-full bg-white opacity-100`}
      rootStyles={{
        "& .ps-sidebar-container": {
          overflow: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          zIndex: 9999,
        },
        "& .ps-sidebar-container::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Menu className="z-9999 box-content w-full pt-10">
        <div className="mb-10 ml-4 mr-4 flex items-center justify-start">
          <Image
            src="/logo.png"
            width={80}
            height={80}
            alt="Fraudit Logo"
            priority
          />
          <h1 className="text-xl uppercase tracking-tighter">Fraudit</h1>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <Link href="/app/u">
              <Image
                className="cursor-pointer rounded-[50%]"
                src={
                  (user.user?.imageUrl as string) ||
                  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }
                width={100}
                height={100}
                alt="User Profile"
              />
            </Link>
          </div>
          <div className="text-center">
            <h2 className="mt-[10px] font-bold text-slate-700">{`${user.user?.firstName} ${user.user?.lastName}`}</h2>
            <div className="flex items-center justify-center gap-2">
              <Link href="/app/u/edit-profile">
                <p className="text-slate-400 underline hover:cursor-pointer">
                  Edit Profile
                </p>
              </Link>
            </div>
          </div>
        </div>
        <MenuItem component={<Link href="/app" />}>Home</MenuItem>
        <MenuItem component={<Link href="/app/f" />}>Fraudits</MenuItem>
        <MenuItem
          // component={<Link href="/app/policies/privacy" />}
          style={{
            color: "gray",
            cursor: "not-allowed",
          }}
        >
          Privacy
        </MenuItem>
        <MenuItem
          //  component={<Link href="/app/policies/user-agreement" />
          style={{
            color: "gray",
            cursor: "not-allowed",
          }}
        >
          User Agreement
        </MenuItem>
        <Separator className="my-3 bg-slate-600" />
        <div
          style={{ padding: "0 24px" }}
          className="mb-2 mt-4 flex justify-center"
        >
          <p className="text-sm font-semibold uppercase">SubFraudits</p>
        </div>
        <DrawerItems />
        <div className="mt-3 text-center">
          <p>Copyright &copy; Fraudit 2024</p>
        </div>
      </Menu>
    </Sidebar>
  );
};
