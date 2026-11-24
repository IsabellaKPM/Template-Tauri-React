import { Pencil, Trash2 } from "lucide-react";
import { UserRoles } from "@/features/auth/enums/userRoles";
import { UserStatus } from "@/features/auth/enums/userStatus";
import type { User } from "@/features/auth/interfaces/user";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

interface UsersTableProps {
  users: User[];
  currentUserId?: string;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({
  users,
  currentUserId,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const isSelf = user.id === currentUserId;

          return (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.name}
                {isSelf && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    (you)
                  </span>
                )}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.role === UserRoles.ADMIN ? "default" : "outline"
                  }
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.status === UserStatus.ACTIVE
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Edit ${user.name}`}
                    onClick={() => onEdit(user)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${user.name}`}
                    disabled={isSelf}
                    onClick={() => onDelete(user)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
