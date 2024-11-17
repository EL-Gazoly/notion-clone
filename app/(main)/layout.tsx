"use client";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import Navigation from "./_components/navigation";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading)
    return (
      <div className=" h-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  if (!isAuthenticated) return redirect("/");
  return (
    <div className=" w-full h-full flex dark:bg-[#1f1f1f] overflow-x-hidden relative">
      <Navigation />
      <main className=" w-full h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
