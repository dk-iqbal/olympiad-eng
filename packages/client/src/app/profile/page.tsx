/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Hind_Siliguri } from "next/font/google";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { fetchAuthUser } from "@/actions/user-info";
import { UserDetailsProps } from "@/models/user";

const HindFont = Hind_Siliguri({
  weight: "400",
  subsets: ["latin"],
});

const ProfilePage = async () => {
    const userInfo: UserDetailsProps = await fetchAuthUser();    
  return (
    <div className="col-span-4 sm:col-span-9">
      <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800 border-2 dark:border-white">
        <section className="space-y-10">
          <div className="border-general border-b pb-3">
            <h2 className="text-1 text-lg font-medium leading-6">
              প্রোফাইল আপডেট
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              আপনার প্রোফাইল আপডেট করুন
            </p>
          </div>
          <form className="space-y-5">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-20">
              <div className="w-full space-y-6 lg:w-1/2">
                <div className={`${HindFont.className}`}>
                  <label
                    htmlFor="mantine-ej6hof48a"
                    className="block mb-1 text-[14px] font-medium break-words"
                    id="mantine-ej6hof48a-label"
                  >
                    আপনার পুরো নাম
                  </label>
                  <div
                    className={`${HindFont.className} no-underline -mt-[3px] mb-[7px] break-words text-[12px] leading-[1.2]`}
                  >
                    কোর্স কমপ্লিশন সার্টিফিকেটে এই নামটি দেয়া হবে। পরিবর্তন করতে
                    পারবেন না
                  </div>
                  <div className="mantine-TextInput-wrapper mantine-12sbrde">
                    <input
                      aria-label="Your full name"
                      id="mantine-ej6hof48a"
                      type="text"
                      aria-invalid="false"
                      readOnly
                      disabled
                      className={`${HindFont.className} block text-left min-h-[36px] pl-3 pr-3 border rounded border-solid border-[#ced4da] h-9 w-full appearance-none resize-none box-border opacity-60 cursor-not-allowed`}
                      value={userInfo?.name}
                    />
                  </div>
                </div>
                <div className={`${HindFont.className}`}>
                  <label
                    htmlFor="mantine-ej6hof48a"
                    className="block mb-1 text-[14px] font-medium break-words"
                    id="mantine-ej6hof48a-label"
                  >
                    আপনার ইমেইল এড্রেস
                  </label>
                  <div
                    className={`${HindFont.className} no-underline -mt-[3px] mb-[7px] break-words text-[12px] leading-[1.2]`}
                  >
                    সব কমিউনিকেশন এই ইমেইল এড্রেসে করা হবে & এটাই আপনার লগইন
                    ইউজারনেম। পরিবর্তন করতে পারবেন না।
                  </div>
                  <div className="mantine-TextInput-wrapper mantine-12sbrde">
                    <input
                      aria-label="Your full name"
                      id="mantine-ej6hof48a"
                      type="text"
                      aria-invalid="false"
                      readOnly
                      disabled
                      className={`${HindFont.className} block text-left min-h-[36px] pl-3 pr-3 border rounded border-solid border-[#ced4da] h-9 w-full appearance-none resize-none box-border opacity-60 cursor-not-allowed`}
                      value={userInfo?.email}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full space-y-6 lg:w-1/2">
                <div className={`${HindFont.className}`}>
                  <label
                    htmlFor="mantine-ej6hof48a"
                    className="block mb-1 text-[14px] font-medium break-words"
                    id="mantine-ej6hof48a-label"
                  >
                    আপনার মোবাইল নাম্বার
                  </label>
                  <div
                    className={`${HindFont.className} no-underline -mt-[3px] mb-[7px] break-words text-[12px] leading-[1.2]`}
                  >
                    পরিবর্তন করতে পারবেন না
                  </div>
                  <div className="mantine-TextInput-wrapper mantine-12sbrde">
                    <input
                      aria-label="Your full name"
                      id="mantine-ej6hof48a"
                      type="text"
                      aria-invalid="false"
                      readOnly
                      disabled
                      className={`${HindFont.className} block text-left min-h-[36px] pl-3 pr-3 border rounded border-solid border-[#ced4da] h-9 w-full appearance-none resize-none box-border opacity-60 cursor-not-allowed`}
                      value={userInfo?.phone}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
