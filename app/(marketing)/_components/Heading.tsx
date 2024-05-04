import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const Heading = () => {
    return ( 
        <div className=" max-w-3xl space-y-4">
            <h1 className=" capitalize text-3xl sm:text-5xl md:text-6xl font-bold">
                your ideas, Documents, & plans. Unifed. welcome to <span className=" underline">Gotion</span>
            </h1>
            <h3 className=" text-base sm:text-xl md:text-2xl font-medium">
                Gotion is the connected workspace where better, faster work happens.
            </h3>
            <Button>
               Enter Gotion <ArrowRight className=" h-4 w-4 ml-2" />
            </Button>
            
            

        </div>
     );
}
 
export default Heading;