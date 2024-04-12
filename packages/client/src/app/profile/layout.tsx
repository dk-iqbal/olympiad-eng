/* eslint-disable @next/next/no-img-element */
import { SessionProps } from "@/actions/user-info";
import { auth } from "@/auth";
import ProfileImage from "@/components/Profile/ProfileImage";
import ProfileNavigation from "@/components/Profile/ProfileNavigation";
import { redirect } from "next/navigation";
import React from "react";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = (await auth()) as SessionProps;
  if (!session?.user) {
    redirect("/signin");
  }
  return (
    <div className="bg-gray-100 dark:bg-gray-800 mt-20">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3 ">
            <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800 border-2 dark:border-white">
              <ProfileImage session={session}/>
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
