"use client";

import { ChevronsLeft, MenuIcon, CirclePlusIcon, SearchIcon, Settings } from "lucide-react";
import { useState, useRef, ElementRef, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import UserItem from "./user-item";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Item from './item';
const Navigation = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const asideRef = useRef<ElementRef<"aside">>(null);
    const navRef = useRef<ElementRef<"div">>(null);
    const isResizingRef = useRef(false);
    const [isRestting, setIsRestting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const documents = useQuery(api.documents.get, { });
    const create = useMutation(api.documents.create);

    useEffect(() => {
        isMobile ? collapse() : resetWidth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile])

    useEffect(() => {
        if (isMobile) collapse();
    }, [pathname, isMobile])

    const handelMouseDown = (event : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseMove = (event : MouseEvent) => {
        if (!isResizingRef.current) return;

        let newWidth = event.clientX;

        if (newWidth < 240 ) newWidth = 240;
        if ( newWidth > 480 ) newWidth = 480;
        
        if (asideRef.current && navRef.current) {
            asideRef.current.style.width = `${newWidth}px`;
            navRef.current.style.width = `calc(100% - ${newWidth}px)`;
            navRef.current.style.setProperty("left", `${newWidth}px`);
        }
    }
    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const resetWidth = () => {
        if (asideRef.current && navRef.current) {
            setIsCollapsed(false);
            setIsRestting(true);
            asideRef.current.style.width = isMobile ? "100%" : "240px";
            navRef.current.style.setProperty( "left", isMobile ? "100%" : "calc(100% - 240px)" )
            navRef.current.style.setProperty( "width", isMobile ? "100%" : "calc(100% - 240px)" )
            setTimeout(() => {
                setIsRestting(false);
            }, 300);
        }
    }

    const collapse = () => {
        if (asideRef.current && navRef.current) {
            setIsCollapsed(true);
            setIsRestting(true);
            asideRef.current.style.width = "0";
            navRef.current.style.setProperty( "left", "0" )
            navRef.current.style.setProperty( "width", "100%" )
            setTimeout(() => {
                setIsRestting(false);
            }, 300);
        }
    }

    const handelCreate = async () => {
        const promise = create({ title : "Untitled" });
        toast.promise(promise, {
            loading : "Creating a new document...",
            success : "Document created successfully",
            error : "Failed to create document"
        })
    }
    

    return ( 
        <div className=" w-60">
            <aside ref={asideRef} className={cn(" group/sidebar h-full w-60 bg-secondary  relative flex flex-col overflow-y-auto z-[99999]", 
                    isRestting && "transition-all duration-300 ease-in-out",
                    isCollapsed && "w-0"       
            )}>
                <div className=" w-6 h-6 text-muted-foreground hover:bg-neutral-300
                    dark:hover:bg-neutral-600 rounded-sm flex items-center justify-center
                    cursor-pointer absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100
                "
                    onClick={collapse}
                >
                    <ChevronsLeft className="w-6 h-6" />
                </div>
                <UserItem />
                <Item 
                    onClick={()=>{}}
                    label="Search"
                    Icon={SearchIcon}
                    isSearch
                />
                <Item 
                    onClick={()=>{}}
                    label="Settings"
                    Icon={Settings}
                />
                <Item 
                    onClick={handelCreate}
                    label="New Page"
                    Icon={CirclePlusIcon}
                />
                {documents?.map((document) => (
                    <div key={document._id} className=" p-2">
                        {document.title}
                    </div>
                
                ))}
                <div 
                    onMouseDown={handelMouseDown}
                    onClick={resetWidth}
                className=" opacity-0 group-hover/sidebar:opacity-100
                transition cursor-ew-resize absolute top-0 right-0 h-full w-1 bg-primary/10
                ">

                </div>
            </aside>
            <div ref={navRef}
                className={cn(" absolute top-0 left-60 w-[calc(100%-240px)] z-[99999]",
                isRestting && "transition-all duration-300 ease-in-out",
                isMobile && "left-0 w-full"
            )}
            >
                    <nav className=" bg-transparent px-3 py-2 w-full">
                       { isCollapsed && <MenuIcon role="button" className="w-6 h-6 text-muted-foreground" onClick={resetWidth} />}
                    </nav>
            </div>

        </div>
     );
}
 
export default Navigation;