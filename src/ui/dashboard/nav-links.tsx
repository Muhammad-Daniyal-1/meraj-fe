"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  TicketIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  UsersIcon,
  IdentificationIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { usePermissions } from "@/hooks/usePermissions";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon, module: "dashboard" },
  {
    name: "Tickets",
    href: "/dashboard/tickets",
    icon: TicketIcon,
    module: "tickets",
  },
  {
    name: "Ledgers",
    href: "/dashboard/ledgers",
    icon: DocumentDuplicateIcon,
    module: "ledgers",
  },
  {
    name: "Payments",
    href: "/dashboard/payments",
    icon: CurrencyDollarIcon,
    module: "payments",
  },
  {
    name: "Providers",
    href: "/dashboard/providers",
    icon: IdentificationIcon,
    module: "providers",
  },
  {
    name: "Agents",
    href: "/dashboard/agents",
    icon: UsersIcon,
    module: "agents",
  },
  {
    name: "Dropdowns",
    href: "/dashboard/dropdowns",
    icon: Cog8ToothIcon,
    module: "dropdowns",
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: UserPlusIcon,
    module: "users",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { canAccessModule, isAdmin, isLoading } = usePermissions();

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[48px] rounded-md bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const filteredLinks = links.filter((link) => {
    // Always show Home
    if (link.module === "dashboard") return true;
    // Show Users only to admin with proper permissions
    if (link.module === "users") return isAdmin && canAccessModule("users");
    // For other modules, check permissions
    return canAccessModule(link.module);
  });

  return (
    <>
      {filteredLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-primary-light hover:text-primary-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-primary-light text-primary-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
