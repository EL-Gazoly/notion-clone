"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";
import { Spinner } from "@/components/Spinner";
const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    return ( 
        <div className=" max-w-3xl space-y-4">
            <h1 className=" capitalize text-3xl sm:text-5xl md:text-6xl font-bold">
                your ideas, Documents, & plans. Unifed. welcome to <span className=" underline">Gotion</span>
            </h1>
            <h3 className=" text-base sm:text-xl md:text-2xl font-medium">
                Gotion is the connected workspace where better, faster work happens.
            </h3>
            {isLoading &&
                <div className=" w-full flex items-center justify-center">
                    <Spinner size={"lg"} />
                </div>
             }
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter Gotion <ArrowRight className=" h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal" signUpForceRedirectUrl={"/"}>
                    <Button size="lg">
                        Get Gotion free
                     <ArrowRight className=" h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
            
            

        </div>
     );
}
 
export default Heading;