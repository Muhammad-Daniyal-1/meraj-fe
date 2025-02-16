"use client";

import SideNav from "@/ui/dashboard/sidenav";
import { useGetUserQuery } from "@/lib/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/auth/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: userData, error } = useGetUserQuery("me");

  useEffect(() => {
    if (userData?.user) {
      dispatch(setUser(userData.user));
    }

    if (error) {
      router.push("/");
    }
  }, [userData, error, dispatch, router]);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-900">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
