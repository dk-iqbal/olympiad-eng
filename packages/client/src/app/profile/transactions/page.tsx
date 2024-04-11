import { fetchUserPayment } from "@/actions/user-info";
import { EnrollmentProps, PaymentProps } from "@/models/enrollment";
import moment from "moment";
import Link from "next/link";
import React from "react";

const Transactions = async () => {
  const paymentInfo: PaymentProps[] = await fetchUserPayment();
  return (
    <div className="col-span-4 sm:col-span-9">
      <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800 border-2 dark:border-white">
        <section className="space-y-10">
          <div className="border-general border-b pb-3">
            <h2 className="text-1 text-lg font-medium leading-6">ট্রানজেকশন</h2>
            <p className="mt-1 text-sm text-gray-500">
              আপনি আমাদের প্লাটফর্মে যে কোর্স গুলোতে ট্রানজেকশন করেছেন
            </p>
          </div>
          {paymentInfo.length > 0 ? (
            <div className="flex flex-col space-y-6">
              <div className="border-general h-full overflow-hidden rounded-lg border bg-white px-2 py-4 shadow dark:bg-slate-900 dark:shadow-none sm:p-6">
                <div className="transaction flex h-full flex-col justify-between overflow-x-auto">
                  <table className="mantine-Table-root __mantine-ref-striped mantine-Table-striped __mantine-ref-hover mantine-Table-hover mantine-12cgjof">
                    <thead>
                      <tr className="bg-slate-100 text-violet-600 dark:bg-slate-800 dark:text-sky-600 hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-800">
                        <th style={{ minWidth: '250px' }}>কোর্স</th>
                        <th style={{ minWidth: '100px' }}>তারিখ</th>
                        <th >পেমেন্ট মেথড</th>
                        <th >এমাউন্ট</th>
                        <th style={{ minWidth: '150px' }}>পেমেন্ট স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentInfo?.map((item: PaymentProps) => (
                        <tr key={item._id}>
                          <td className="primary-highlighter text-left font-medium">
                            <Link href={`/${item.courseId}`} className="bg-slate-100 text-violet-600 dark:bg-slate-800 dark:text-sky-600 hover:bg-slate-100 hover:text-gray-800 dark:hover:bg-gray-200">
                              {item.courseName || "Enrolment Course"}
                            </Link>
                          </td>
                          <td className="text-center">
                            {moment(item.paymentDate).format(
                              "DD MMM YYYY"
                            )}
                          </td>
                          <td
                            className="primary-highlighter font-medium text-center"
                            align="center"
                          >
                            {item.transactionType}
                          </td>
                          <td
                            className="primary-highlighter font-medium text-center"
                            align="center"
                          >
                            {item.amount}
                          </td>
                          <td
                            className="primary-highlighter font-medium capitalize"
                            align="center"
                          >
                            <a>{item.status ? "Complete" : "Incomplete"}</a>
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

export default Transactions;
