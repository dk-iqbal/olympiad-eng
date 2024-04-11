'use client'

import { changePassAction } from "@/actions/user-auth";
import { Hind_Siliguri } from "next/font/google";
import React from "react";
import { useFormState } from "react-dom";

const HindFont = Hind_Siliguri({
  weight: "400",
  subsets: ["latin"],
});

const ChangePassword = () => {

  const [formState, action] = useFormState(changePassAction, {
    errors: {},
  });

  return (
    <div className="col-span-4 sm:col-span-9">
      <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800 border-2 dark:border-white">
        <section className="space-y-10">
          <div className="border-general border-b pb-3">
            <h2 className="text-1 text-lg font-medium leading-6">
              পাসওয়ার্ড পরিবর্তন করুন
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              আপনার পাসওয়ার্ড কারো সাথে শেয়ার করবেন না
            </p>
          </div>
          <form className="space-y-5" action={action}>
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-20">
              <div className="w-full space-y-6 lg:w-1/2">
                <div className={`${HindFont.className}`}>
                  <label
                    htmlFor="mantine-ej6hof48a"
                    className="block mb-1 text-[14px] font-medium break-words"
                    id="mantine-ej6hof48a-label"
                  >
                    নতুন পাসওয়ার্ড
                  </label>
                  <div className="mantine-TextInput-wrapper mantine-12sbrde">
                    <input
                      aria-label="Your full name"
                      id="mantine-ej6hof48a"
                      type="password"
                      name="password"
                      aria-invalid="false"
                      className={`${HindFont.className} block text-left min-h-[36px] pl-3 pr-3 border rounded border-solid border-[#ced4da] h-9 w-full appearance-none resize-none box-border opacity-60 `}
                      //   value={userInfo?.name}
                    />
                  </div>
                  {formState.errors.password && (
                    <div className="flex items-center gap-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="15px"
                          height="15px"
                        >
                          <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z" />
                        </svg>
                      </span>
                      <span className="text-sm font-roboto font-light  text-opacity-80 text-red-500">
                        {formState.errors.password?.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
                <div className={`${HindFont.className}`}>
                  <label
                    htmlFor="mantine-ej6hof48a"
                    className="block mb-1 text-[14px] font-medium break-words"
                    id="mantine-ej6hof48a-label"
                  >
                    কনফার্ম পাসওয়ার্ড
                  </label>
                  <div className="mantine-TextInput-wrapper mantine-12sbrde">
                    <input
                      aria-label="Your full name"
                      id="mantine-ej6hof48a"
                      type="password"
                      name="confirmPassword"
                      aria-invalid="false"
                      className={`${HindFont.className} block text-left min-h-[36px] pl-3 pr-3 border rounded border-solid border-[#ced4da] h-9 w-full appearance-none resize-none box-border  opacity-60`}
                      //   value={userInfo?.name}
                    />
                  </div>
                  {formState.errors._form ? (
                    <div className="rounded p-2 mt-4 bg-red-200 border border-red-400">
                      {formState.errors._form?.join(", ")}
                    </div>
                  ) : null}
                </div>
                <div className="mantine-Group-root mantine-19jxmdp">
                  <button
                    className="mantine-Button-filled bg-slate-800 dark:bg-secondary2 hover:bg-slate-700 dark:hover:bg-secondary1 text-white mantine-Button-root mantine-Group-child mantine-13xrvzk"
                    type="submit"
                  >
                    <div className="mantine-3xbgk5 mantine-Button-inner">
                      <span className="mantine-qo1k2 mantine-Button-label">
                        সাবমিট করুন
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
