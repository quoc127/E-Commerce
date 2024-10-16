import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const AdminDeleteDialog = ({
  isOpenAlert,
  setIsOpenAlert,
  istemToDelete,
  setIsConfirmDelete,
}) => {
  return (
    <AlertDialog open={isOpenAlert} onOpenChange={setIsOpenAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure delete?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want remove item:{" "}
            <strong>
              {istemToDelete
                ? istemToDelete.name
                : "Brand item is null"}
            </strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => setIsConfirmDelete(true)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
