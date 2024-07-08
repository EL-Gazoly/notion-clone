import {
     ChevronDown,
     LucideIcon,
     ChevronRight,
     PlusIcon,
     MoreHorizontal,
     Trash
  } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { 
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useUser } from "@clerk/clerk-react";
type ItemProps = {
    Id? : Id<"documents">
    documentIcon? : string;
    active? : boolean;
    expanded? : boolean;
    isSearch? : boolean;
    level? : number;
    onExpand? : () => void;
    onClick?: () => void;
    Icon : LucideIcon;
    label : string;
}
const Item = ({
Id,
label,
Icon,
onClick,
documentIcon,
active,
expanded,
isSearch,
level = 0,
onExpand,
}:ItemProps) => {
    const { user } = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    const handleExpand = (event : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
    }

    const handelCreate = (event : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!Id) return;
        event.stopPropagation();
        const promise = create({title : "Untitled", parentDocument : Id})
        .then((documentId)=> {
            if(!expanded){
                onExpand?.();
            }
            //router.push(`/documents/${documentId}`);
        })
        toast.promise(promise, {
            loading : "Creating a new note...",
            success : "New note created",
            error : "Failed to create a new note",
        });
    }

    const handelArchive = (event : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!Id) return;
        event.stopPropagation();
        const promise = archive({id : Id})
        toast.promise(promise, {
            loading : "Archiving note...",
            success : "note archived",
            error : "Failed to archive note",
        });
    }

    
    return ( 
        <div role="button"
            onClick={onClick}
            style={{paddingLeft: level ? `${(level * 12) + 12}px` : "12px"}}
            className={cn(" group min-h-[27px] w-full text-muted-foreground text-sm font-medium hover:bg-primary/5 flex items-center gap-x-2 py-1 pr-3",
                active && "bg-primary/5 text-primary",
            )}>
                {!!Id && (
                    <div
                        role="button"
                        className=" h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                        onClick={handleExpand}
                    >
                        <ChevronIcon className=" w-4 h-4 shrink-0 text-muted-foreground/50" />
                    </div>
                )}
                {documentIcon ? (
                    <div className=" shrink-0 text-[18px] mr-2">
                        {documentIcon}
                    </div>
                ) : (
                    <Icon className=" shrink-0 h-[18px] text-muted-foreground" />
                )}
                <span className=" truncate">
                  {label}  
                </span>
                {isSearch && (
                    <kbd className=" ml-auto pointer-events-none inline-flex h-5
                     select-none items-center gap-1 rounded border bg-muted px-1.5 
                      font-mono text-[10px] font-medium text-muted-foreground
                    ">
                        <span className=" text-xs">⌘</span>K
                    </kbd>
                )}
                {!!Id && (
                    <div className=" ml-auto flex items-center gap-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div
                                    role="button"
                                    className=" opacity-0 group-hover:opacity-100 h-full rounded-sm
                                    hover:bg-neutral-300 dark:hover:bg-neutral-600
                                    "
                                >
                                    <MoreHorizontal className=" w-4 h-4 text-muted-foreground" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className=" w-60"
                                align="start"
                                side="right"
                                forceMount
                            >  
                                <DropdownMenuItem onClick={handelArchive} >
                                    <Trash className=" w-4 h-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              <div className=" text-sm text-muted-foreground p-2">
                                Last edited by {user?.fullName}
                              </div>


                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div role="button" onClick={handelCreate} className=" opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm
                                hover:bg-neutral-300 dark:hover:bg-neutral-600 " >
                                <PlusIcon className=" w-4 h-4 text-muted-foreground" />

                        </div>
                    </div>
                )}
            
        </div>
     );
}

Item.skeleton = function ItemSkeleton ({level} : {level : number})  {
    return (
       <div
        style={{
            paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
        }}
        className=" flex gap-x-2 py-[3px]"
       >
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-[30%]" />
       </div>
    )
}
 
export default Item;