import { SearchBar } from "@/components/rmp/search-bar";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const RateMyProfessorHomePage = async () => {
  const userPromise = currentUser();

  const [user] = await Promise.all([userPromise]);

  return (
    <main className="flex w-full items-center justify-between p-5 sm:p-16">
      <div className="mt-[2rem] flex w-full flex-col items-center justify-center gap-14">
        <div className="">
          <h2 className="text-center text-[2rem] font-extrabold sm:text-[3rem]">
            Fraudit: Rate My Professor
          </h2>
          <p className="uppercase text-muted-foreground">
            Welcome Back, {user?.username}
          </p>
        </div>
        <SearchBar className="flex md:hidden" />

        <Link
          className="mx-auto w-full"
          href="/rmp/university/5d617113-160f-40af-a345-10f3c7297029"
        >
          <Button className="mx-auto w-full" variant="default">
            View CSU Fullerton
          </Button>
        </Link>

        <div className="flex flex-col gap-1">
          <h3 className="mb-2 text-[1.25rem] text-zinc-800 md:mb-5 md:text-3xl">
            As Easy as 1 2 3...
          </h3>

          <div className="flex w-full flex-col gap-3 px-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-rose-500 px-3 py-1 text-white">
                1
              </span>
              <p>Enter Your Professors Name</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-400 px-3 py-1 text-white">
                2
              </span>
              <p>Choose Your Professor</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-green-500 px-3 py-1 text-white">
                3
              </span>
              <p>Read Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RateMyProfessorHomePage;
