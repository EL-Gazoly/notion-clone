import Logo from "./Logo";
import { Button } from "@/components/ui/button";
const Footer = () => {
    return (  
        <div className=" flex items-center w-full p-6 bg-background z-50 dark:bg-dark-bg">
            <Logo />
            <div className=" w-full md:ml-auto justify-between md:justify-end text-muted-foreground flex gap-x-2 items-center">
                <Button variant={"ghost"} size={"sm"}>
                    Privacy Policy
                </Button>
                <Button variant={"ghost"} size={"sm"}>
                   Terms & Conditions
                </Button>

            </div>
        </div>
    );
}
 
export default Footer;