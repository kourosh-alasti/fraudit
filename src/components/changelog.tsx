import { readdirSync } from "fs";
import path from "path";
import fs from "fs";
import Markdown from "react-markdown";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";

const logDir = path.join(process.cwd(), "changelogs");

export const Changelog = () => {
  const filenames = readdirSync(logDir);

  const allLogData: { id: string; fileContent: string }[] = filenames.map(
    (file) => {
      const id = file.replace(/\.md$/, "");

      const fullpath = path.join(logDir, file);
      const fileContent = fs.readFileSync(fullpath, "utf8");

      return {
        id,
        fileContent,
      };
    },
  );

  return (
    <div className="flex flex-col gap-8 p-2 sm:p-10">
      {allLogData.reverse().map((post, index) => (
        <div
          key={post.id}
          className="flex h-full w-full flex-col justify-center rounded-lg border p-4"
        >
          <div className="flex flex-row justify-between">
            <h3 className="text-xl font-bold">{post.id}</h3>
            <a
              rel="nofollow"
              target="_blank"
              aria-label="Go To Release"
              title="Go To Release"
              href={`https://github.com/kourosh-alasti/fraudit/releases/tag/${post.id}`}
            >
              <ExternalLinkIcon className="h-5 w-5 cursor-pointer" />
            </a>
          </div>
          <div className="mt-3 flex flex-row flex-wrap items-center">
            <Image
              width={100}
              height={100}
              src="/the_thing.png"
              alt="fraudit"
              className="mr-2 h-7 w-7 rounded-full"
            />
            <p>
              <Link href="https://github.com/kourosh-alasti">
                <b>kourosh-alasti</b>
              </Link>{" "}
              released this.
            </p>
          </div>
          <Separator />
          <div className="markdown-body">
            <Markdown key={index}>{post.fileContent}</Markdown>
          </div>
        </div>
      ))}
    </div>
  );
};
