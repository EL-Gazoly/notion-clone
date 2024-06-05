"use client";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const DocumentsPage = () => {
    const { user } = useUser();
    return ( 
        <div className=" w-full h-full flex flex-col items-center justify-center space-y-2">
            <Image src={"/empty-light.svg"} alt="" width={300} height={300} className=" dark:hidden" />
            <Image src={"/empty-dark.svg"} alt="" width={300} height={300} className=" hidden dark:block" />
            <h1 className=" text-lg font-medium">Welcome to {user?.firstName}&apos;s Gotion</h1>
            <Button>
                <PlusCircle className=" w-4 h-4 mr-2" />
                <span>Create Document</span>
            </Button>
        </div>
     );
}
 
export default DocumentsPage;