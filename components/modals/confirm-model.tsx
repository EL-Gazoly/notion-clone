"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogFooter
} from "@/components/ui/alert-dialog"

interface ConfirmModelProps {
    children : React.ReactNode;
    onConfirm : () => void;
}

const ConfirmModel = ({
    children,
    onConfirm
} : ConfirmModelProps) => {
    const handelConfirm = (
        event : React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onConfirm();
    }
    return ( 
        <AlertDialog>
            <AlertDialogTrigger onClick={(e)=> e.stopPropagation} asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you abusolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel  onClick={(e)=>e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={(e)=>handelConfirm(e)}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
     );
}
 

export default ConfirmModel;