import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Sparkles } from "lucide-react";

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="max-w-sm text-center">
        <AlertDialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-blue-500" />
              </div>
              <Loader2 className="absolute -top-1 -right-1 h-5 w-5 text-blue-400 animate-spin" />
            </div>
            <div>
              <AlertDialogTitle className="text-foreground text-lg">Generating your course</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground mt-1">
                AI is building your course structure. This usually takes a few seconds.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
