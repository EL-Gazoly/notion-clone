"use client";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import Title from "./title";
import Banner from "./banner";
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
      <nav className=" bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
        <Title.Skeleton />
      </nav>
    );
  if (document === null) return null;
  return (
    <div className=" w-full bg-background dark:bg-[#1f1f1f] px-3 py-2  flex items-center gap-x-4">
      {isCollapsed && (
        <MenuIcon
          role="button"
          className="w-6 h-6 text-muted-foreground"
          onClick={onResetWidth}
        />
      )}
      {document.isArchived && <Banner documentId={document._id} />}
      {!document.isArchived && (
        <div className=" flex items-center justify-between">
          <Title initalData={document} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
