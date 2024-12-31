import React from "react";

const actionColors: Record<string, string> = {
  Add: "bg-green-100 text-green-800",
  Delete: "bg-red-100 text-red-800",
  Edit: "bg-orange-100 text-orange-800",
  Update: "bg-yellow-100 text-yellow-800",
  Read: "bg-blue-100 text-blue-800",
};

interface UserPermissionsProps {
  permissions: string[];
}

const UserPermissions = ({ permissions }: UserPermissionsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {permissions.map((permission, index) => {
        // Extract the action (e.g., "Add", "Delete") from the permission string
        const action = permission.split(" ")[0] || ""; // Get the first word

        // Assign color based on the action
        const pillColor = actionColors[action] || "bg-gray-100 text-gray-800"; // Default gray if no match

        return (
          <span
            key={index}
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-1 ${pillColor}`}
          >
            {permission}
          </span>
        );
      })}
    </div>
  );
};

export default UserPermissions;
