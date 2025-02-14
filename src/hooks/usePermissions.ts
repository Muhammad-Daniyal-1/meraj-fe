import { useSelector } from "react-redux";
import { useGetUserQuery } from "@/lib/api/userApi";

type Permission = string;

export const usePermissions = () => {
  const user = useSelector((state: any) => state.auth.user);
  const { isLoading } = useGetUserQuery("me");

  const hasPermission = (permission: Permission): boolean => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    if (!user || !user.role) return false;
    return user.role === role;
  };

  const canAccessModule = (module: string): boolean => {
    const permissionMap: Record<string, string[]> = {
      users: ["Read User"],
      createUser: ["Create User"],
      editUser: ["Edit User"],
      deleteUser: ["Delete User"],
      tickets: ["Read Ticket"],
      createTicket: ["Create Ticket"],
      editTicket: ["Edit Ticket"],
      deleteTicket: ["Delete Ticket"],
      providers: ["Read Provider"],
      createProvider: ["Create Provider"],
      editProvider: ["Edit Provider"],
      deleteProvider: ["Delete Provider"],
      agents: ["Read Agent"],
      createAgent: ["Create Agent"],
      editAgent: ["Edit Agent"],
      deleteAgent: ["Delete Agent"],
      ledgers: ["Read Ledger"],
      payments: ["Read Payment"],
      createPayment: ["Create Payment"],
      editPayment: ["Edit Payment"],
      deletePayment: ["Delete Payment"],
      dropdowns: ["Read Payment Method"],
      createPaymentMethod: ["Create Payment Method"],
      editPaymentMethod: ["Edit Payment Method"],
      deletePaymentMethod: ["Delete Payment Method"],
    };

    const requiredPermissions = permissionMap[module.toLowerCase()];
    if (!requiredPermissions) return true; // If no permissions defined, allow access

    return requiredPermissions.some((permission) => hasPermission(permission));
  };

  return {
    hasPermission,
    hasRole,
    canAccessModule,
    isAdmin: hasRole("Admin"),
    permissions: user?.permissions || [],
    isLoading,
  };
};
