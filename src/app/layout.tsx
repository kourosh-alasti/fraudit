import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import "./markdown.css";
import "@mdxeditor/editor/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fraudit",
  description: "A Fraudulent Reddit Remake",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        afterSignOutUrl={"/"}
      >
        <body className={inter.className}>
          <Toaster />
          <div className="flex h-full w-full flex-col">{children}</div>
        </body>
      </ClerkProvider>
    </html>
  );
}
