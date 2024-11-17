"use client";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import Title from "./title";
import Banner from "./banner";
import Menu from "./Menu";
import Publish from "./publish";
type NavbarProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};
const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    id: params.documentId as Id<"documents">,
  });
  if (document === undefined)
    return (
      <nav className=" bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center justify-between gap-x-4">
        <Title.Skeleton />
        <div className=" flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  if (document === null) return null;
  return (
    <nav className=" w-full bg-background dark:bg-[#1f1f1f] px-3 py-2  flex flex-col gap-x-4">
      {isCollapsed && (
        <MenuIcon
          role="button"
          className="w-6 h-6 text-muted-foreground"
          onClick={onResetWidth}
        />
      )}

      <div className=" w-full flex items-center justify-between">
        <Title initalData={document} />
        <div className=" flex items-center  gap-x-2">
          <Publish initialData={document} />
          <Menu documentId={document._id} />
        </div>
      </div>
      {document.isArchived && <Banner documentId={document._id} />}
    </nav>
  );
};

export default Navbar;
