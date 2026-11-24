import type { User } from "@/features/auth/interfaces/user";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { getErrorMessage } from "@/shared/lib/errors";
import { useUsers } from "../hooks/useUsers";

interface DeleteUserDialogProps {
  user?: User;
  onOpenChange: (open: boolean) => void;
}

export function DeleteUserDialog({
  user,
  onOpenChange,
}: DeleteUserDialogProps) {
  const { deleteMutation } = useUsers();

  const close = () => {
    deleteMutation.reset();
    onOpenChange(false);
  };

  const confirm = () => {
    if (!user) return;
    deleteMutation.mutate(user.id, { onSuccess: close });
  };

  return (
    <Dialog open={!!user} onOpenChange={(open) => (open ? undefined : close())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription>
            This will permanently delete {user?.name} ({user?.email}). This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {deleteMutation.isError && (
          <p role="alert" className="text-sm text-destructive">
            {getErrorMessage(
              deleteMutation.error,
              "Could not delete the user.",
            )}
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={confirm}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
