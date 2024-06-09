import { ChevronDown, LucideIcon } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
type ItemProps = {
    Id? : Id<"documents">
    documentIcon? : string;
    active? : boolean;
    expanded? : boolean;
    isSearch? : boolean;
    level? : number;
    onExpand? : () => void;
    onClick: () => void;
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
    const ChevronIcon = expanded ? ChevronDown : ChevronDown;
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
                        onClick={()=> {}}
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
            
        </div>
     );
}
 
export default Item;