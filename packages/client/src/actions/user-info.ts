"use server";

import { auth } from "@/auth";
import { USER_API } from "@/services/api-end-point/user";
import clientAxios from "@/services/config";
import { redirect } from "next/navigation";

export interface SessionProps {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
  };
}

export async function fetchAuthUser() {
  const session = (await auth()) as SessionProps;

  if (!session?.user) {
    redirect("/login");
  }
  try {
    const res = await clientAxios.get(
      `${USER_API.fetch_user_by_id(session?.user?.id)}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserEnrollment() {
  const session = (await auth()) as SessionProps;

  if (!session?.user) {
    redirect("/login");
  }
  try {
    const res = await clientAxios.get(
      `${USER_API.fetch_user_enrollment_by_id(session?.user?.id)}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserPayment() {
  const session = (await auth()) as SessionProps;

  if (!session?.user) {
    redirect("/login");
  }
  try {
    const res = await clientAxios.get(
      `${USER_API.fetch_user_payment_by_id(session?.user?.id)}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
