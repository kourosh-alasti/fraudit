import Image from "next/image";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect } from "react";
import { SidebarItems } from "./sidebar-items";

const TEMP_FRAUDITS = [
  "Homework",
  "ComputerScience",
  "CSUFullerton",
  "Classes2Take",
  "Parties&Socials",
  "TopFood",
  "BestBarsInTown",
  "DessertAfter",
  "PsychDepartment",
  "Housing4Cheap",
  "BestMallsInOC",
  "OCDeals",
  "TextBooksMarket",
  "StudyBuddies",
  "Beers&Cheers",
  "SportsTeams",
  "CheapHousing",
  "Flights",
  "CarpooLExclusives",
];

export const SideDrawer = () => {
  const user = useUser();
  const { isOpen, close } = useSidebar();

  return (
    <Sidebar
      onBackdropClick={() => close()}
      toggled={isOpen}
      breakPoint="all"
      className={`ps-broken h-full bg-indigo-300`}
      rootStyles={{
        "& .ps-sidebar-container": {
          overflow: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
        "& .ps-sidebar-container::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Menu className="box-content w-full pt-10 ">
        <div className="mb-10 ml-4 mr-4 flex items-center justify-between">
          <Image
            src="/the_thing.png"
            width={80}
            height={80}
            alt="Fraudit Logo"
            priority
          />
          <h1 className="text-xl uppercase">Fraudit</h1>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <Link href="/app/user">
              <Image
                className="cursor-pointer rounded-[50%]"
                src={user.user?.imageUrl as string}
                width={100}
                height={100}
                alt="Fraudit Logo"
              />
            </Link>
          </div>
          <div className="text-center">
            <h2 className="mt-[10px] font-bold text-slate-700">{`${user.user?.firstName} ${user.user?.lastName}`}</h2>
            <div className="flex items-center justify-center gap-2">
              <Link href="/app/user/edit-profile">
                <p className="text-slate-400 underline hover:cursor-pointer">
                  Edit Profile
                </p>
              </Link>
              {/* |
              <Link href="/app" onClick={() => signOut()}>
                <p className="text-slate-400 underline hover:cursor-pointer">
                  Logout
                </p>
              </Link> */}
            </div>
          </div>
        </div>
        <MenuItem component={<Link href="/app" />}>Home</MenuItem>
        <MenuItem component={<Link href="/app/fraudits" />}>Fruadits </MenuItem>
        <MenuItem component={<Link href="/app/policies/privacy" />}>
          Privacy
        </MenuItem>
        <MenuItem component={<Link href="/app/policies/user-agreement" />}>
          User Agreement
        </MenuItem>
        <Separator className="my-3 bg-slate-600" />
        <div
          style={{ padding: "0 24px" }}
          className="mb-2 mt-4 flex justify-center"
        >
          <p className="text-sm font-semibold uppercase">SubFraudits</p>
        </div>
        <SidebarItems />
        <div className="mt-3 text-center ">
          <p>Copyright &copy; Fraudit 2024</p>
        </div>
      </Menu>
    </Sidebar>
  );
};
