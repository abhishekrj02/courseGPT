import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import loader from "@/public/loading.gif";

function LoadingDialog({ loading }) {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex flex-col items-center">
                        <Image alt="loader" src={loader} width={80} height={80} />
                        <AlertDialogTitle>Please wait...</AlertDialogTitle>
                        <AlertDialogDescription>
                        
                            Your course is being generated.
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default LoadingDialog;
