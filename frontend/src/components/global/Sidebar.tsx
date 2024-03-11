import Image from "next/image";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useUserStore } from "@/store/use-user-store";
import { Separator } from "../ui/separator";
import { useContext } from "react";
import { SidebarContext } from "@/providers/sidebar-provider";
import Link from "next/link";

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

export default function NewSidebar({}) {
  const user = useUserStore((state) => state.user);
  const sidebarContext = useContext(SidebarContext);

  return (
    <Sidebar
      onBackdropClick={sidebarContext.toggleSidebar}
      toggled={sidebarContext.toggled}
      breakPoint="all"
      className="bg-indigo-300 h-full"
      rootStyles={{
        "& .ps-sidebar-container": {
          overflow: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
        "& .ps-sidebar-container::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Menu className="pt-10  pr-[17px] box-content w-full ">
        <div className="flex justify-between items-center ml-4 mb-10 mr-4">
          <Image
            src="/the_thing.png"
            width={80}
            height={80}
            alt="Fraudit Logo"
          />
          <h1 className="text-xl uppercase">Fraudit</h1>
        </div>
        <div className="mb-6">
          <div className="flex justify-center items-center">
            <Link href="/profile">
              <Image
                className="cursor-pointer rounded-[50%]"
                src={user?.profile_picture as string}
                width={100}
                height={100}
                alt="Fraudit Logo"
              />
            </Link>
          </div>
          <div className="text-center">
            <h2 className="font-bold mt-[10px] text-slate-700">{`${user?.first_name} ${user?.last_name}`}</h2>
            <Link href="/profile/edit">
              <p className="underline text-slate-400 hover:cursor-pointer">
                Edit Profile
              </p>
            </Link>
          </div>
        </div>
        <MenuItem component={<Link href="/" />}>Home</MenuItem>
        <MenuItem component={<Link href="/fraudits" />}>Fruadits </MenuItem>
        <MenuItem component={<Link href="/policies/privacy" />}>
          Privacy
        </MenuItem>
        <MenuItem component={<Link href="/policies/user-agreement" />}>
          User Agreement
        </MenuItem>
        <Separator className="bg-slate-600 my-3" />
        <div
          style={{ padding: "0 24px" }}
          className="mb-2 mt-4 flex justify-center"
        >
          <p className="font-semibold uppercase text-sm">SubFraudits</p>
        </div>
        {TEMP_FRAUDITS.map((fraudit) => (
          <MenuItem key={`${fraudit}-item`}>{`f/${fraudit}`}</MenuItem>
        ))}
        <div className="mt-3 text-center ">
          <p>Copyright &copy; Fraudit 2024</p>
        </div>
      </Menu>
    </Sidebar>
  );
}
