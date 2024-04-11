/* eslint-disable @next/next/no-img-element */
import { SessionProps } from "@/actions/user-info";
import { auth } from "@/auth";
import ProfileNavigation from "@/components/Profile/ProfileNavigation";
// import { USER_PROFILE } from "@/utils/helper";
import { redirect } from "next/navigation";
import React from "react";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = (await auth()) as SessionProps;
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="bg-gray-100 dark:bg-gray-800 mt-20">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3 ">
            <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800 border-2 dark:border-white">
              <div className="flex flex-col items-center">
                <img
                  src={session?.user?.image || '/images/own/profile.png'}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="Profile"
                />
                <h1 className="text-xl font-bold">{session.user.name || ""}</h1>
                <p className="text-gray-700">{session.user.email || ""}</p>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <ProfileNavigation />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
