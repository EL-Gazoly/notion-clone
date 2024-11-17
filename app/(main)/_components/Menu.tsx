import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, TrashIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type MenuProps = {
  documentId: Id<"documents">;
};
const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const archive = useMutation(api.documents.archive);
  const { user } = useUser();

  const onArchive = () => {
    const promise = archive({ id: documentId });
    toast.promise(promise, {
      loading: "Moving to trash ...",
      success: "Note moved to trash",
      error: "Failed to archive note",
    });
    router.push("/documents");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <MoreHorizontal className=" w-4 h-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive} className=" cursor-pointer">
          <TrashIcon className=" w-4 h-4 mr-2 " />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span className=" text-xs text-muted-foreground p-2">
            Last Edited by: {user?.fullName}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className=" h-10 w-10" />;
};
