"use client";

import Link from "next/link";
import NavLinks from "@/ui/dashboard/nav-links";
import MerajLogo from "@/ui/meraj-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useLogoutMutation } from "@/lib/api/userApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SideNav() {
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout({ force: true }).unwrap();
      toast.success("Logout successful");
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start bg-gray-50 rounded-md p-4 md:h-40"
        href="/"
      >
        <div className="w-32 md:w-40">
          <MerajLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 overflow-y-auto">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={handleLogout}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-primary-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
