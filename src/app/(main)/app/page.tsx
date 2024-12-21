import { Changelog } from "@/components/changelog";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const userPromise = currentUser();

  const [user] = await Promise.all([userPromise]);

  return (
    <main className="flex w-full items-center justify-between p-5 sm:p-16">
      <div className="mt-[2rem] flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-[2rem] font-extrabold sm:text-[3rem]">
          Fraudit Changelog
        </h2>
        <p className="uppercase text-muted-foreground">
          Welcome Back, {user?.username}
        </p>
        <Changelog />
      </div>
    </main>
  );
}
