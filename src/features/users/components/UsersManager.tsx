import { useState } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { User } from "@/features/auth/interfaces/user";
import { Button } from "@/shared/components/ui/button";
import { getErrorMessage } from "@/shared/lib/errors";
import { useUsers } from "../hooks/useUsers";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { UserFormDialog } from "./UserFormDialog";
import { UsersTable } from "./UsersTable";

export function UsersManager() {
  const { user: currentUser } = useAuth();
  const { usersQuery } = useUsers();
  const [isCreating, setIsCreating] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User>();
  const [userToDelete, setUserToDelete] = useState<User>();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">
            Create, edit and remove the users of the application.
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus />
          New user
        </Button>
      </div>

      {usersQuery.isPending && (
        <p className="text-muted-foreground">Loading users...</p>
      )}

      {usersQuery.isError && (
        <p role="alert" className="text-destructive">
          {getErrorMessage(usersQuery.error, "Could not load the users.")}
        </p>
      )}

      {usersQuery.isSuccess && (
        <UsersTable
          users={usersQuery.data}
          currentUserId={currentUser?.id}
          onEdit={setUserToEdit}
          onDelete={setUserToDelete}
        />
      )}

      <UserFormDialog open={isCreating} onOpenChange={setIsCreating} />
      <UserFormDialog
        key={userToEdit?.id}
        open={!!userToEdit}
        user={userToEdit}
        onOpenChange={(open) => !open && setUserToEdit(undefined)}
      />
      <DeleteUserDialog
        user={userToDelete}
        onOpenChange={(open) => !open && setUserToDelete(undefined)}
      />
    </div>
  );
}
