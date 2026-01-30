
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangleIcon } from 'lucide-react';
import { useState } from "react";

type Variant = "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined

const useConfirm = (variant: Variant, title: string, message: string, confirmText = "Confirm", cancelText = "Cancel",) => {

  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirm = () => new Promise<boolean>((resolve) => {
    setPromise({ resolve });
  });

  const handleClose = (isOpen: boolean) => {
    promise?.resolve(isOpen);
    setPromise(null);
  };

  const handleConfirm = () => {
    handleClose(true)
  };

  const handleCancel = () => {
    handleClose(false)
  };

  const ConfirmationDialog = () => (
    <AlertDialog open={promise !== null} onOpenChange={handleClose}>
      <AlertDialogContent className={"z-60"} size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className={getVariantStyle("destructive")}>
            <AlertTriangleIcon />
          </AlertDialogMedia>
          <AlertDialogTitle className="">{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction variant={variant} onClick={handleConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  return [ConfirmationDialog, confirm] as const;
}



export default useConfirm

// TODO: Add more variants and Media respectively (Created on 2026-01-30)
const getVariantStyle = (v: Variant): string => {
  switch (v) {
    case "destructive": return "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"
    default: return "";
  }
}