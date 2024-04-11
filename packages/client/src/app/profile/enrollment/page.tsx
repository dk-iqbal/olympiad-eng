import { fetchUserEnrollment } from "@/actions/user-info";
import { EnrollmentProps } from "@/models/enrollment";
import moment from "moment";
import Link from "next/link";
import React from "react";

const Enrollment = async () => {
  const enrollmentInfo: EnrollmentProps[] = await fetchUserEnrollment();

  return (
    <div className="col-span-4 sm:col-span-9">
      <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800 border-2 dark:border-white">
        <section className="space-y-10">
          <div className="border-general border-b pb-3">
            <h2 className="text-1 text-lg font-medium leading-6">
              কোর্স এনরোলমেন্ট
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              আপনি আমাদের প্লাটফর্মে যে কোর্স গুলোতে এনরোল করেছেন
            </p>
          </div>
          {enrollmentInfo.length > 0 ? (
            <div className="flex flex-col space-y-6">
              <div className="border-general h-full overflow-hidden rounded-lg border bg-white px-2 py-4 shadow dark:bg-slate-900 dark:shadow-none sm:p-6">
                <div className="transaction flex h-full flex-col justify-between overflow-x-auto">
                  <table className="mantine-Table-root __mantine-ref-striped mantine-Table-striped __mantine-ref-hover mantine-Table-hover mantine-12cgjof">
                    <thead>
                      <tr className="bg-slate-100 text-violet-600 dark:bg-slate-800 dark:text-sky-600 hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-800">
                        <th style={{minWidth: '250px'}}>কোর্স</th>
                        <th style={{minWidth:'100px'}}> এনরোলমেন্টের সময়</th>
                        <th className="">এনরোলমেন্ট আইডি</th>
                        <th style={{minWidth: '100px'}}>বিস্তারিত</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollmentInfo?.map((item: EnrollmentProps) => (
                        <tr key={item._id}>
                          <td className="primary-highlighter text-left font-medium">
                            <Link href={`/${item.courseId}`} className="bg-slate-100 text-violet-600 dark:bg-slate-800 dark:text-sky-600 hover:bg-slate-100 hover:text-gray-800 dark:hover:bg-gray-200">
                              {item.courseName}
                            </Link>
                          </td>
                          <td className="">
                            {moment(item.enrollmentDate).format(
                              "DD MMM YYYY"
                            )}
                          </td>
                          <td
                            className="primary-highlighter font-medium text-center"
                            align="center"
                          >
                            {item._id}
                          </td>
                          <td
                            className="primary-highlighter font-medium capitalize"
                            align="center"
                          >
                            <Link href={`/${item.courseId}/course/report`} className="bg-blue-500 text-white px-2 py-1 rounded-full inline-block">
                              কোর্স রিপোর্ট
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <p>কোন কিছু পাওয়া যাইনি</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Enrollment;
