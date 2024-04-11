"use server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SessionProps } from "./user-info";
import clientAxios from "@/services/config";
import { USER_API } from "@/services/api-end-point/user";

const changePassSchema = z.object({
  password: z.string().min(8),
});

interface ChangePassFormState {
  errors: {
    password?: string[];
    _form?: string[];
  };
}

export async function changePassAction(
  formState: ChangePassFormState,
  formData: FormData
): Promise<ChangePassFormState> {
  const confirmPassword = formData.get("confirmPassword") as string;
  const result = changePassSchema.safeParse({
    password: formData.get("password"),
  });

  const session = (await auth()) as SessionProps;

  if (!session?.user) {
    redirect("/login");
  }

  if (!result.success) {
    return {
      errors: (result as any).error.flatten().fieldErrors,
    };
  }
  if (result.data.password !== confirmPassword) {
    return {
      errors: {
        _form: ["Password does not match"]
      },
    };
  }
  try {
    await clientAxios.put(
      `${USER_API.user_reset_password_by_id(session?.user?.id)}`,
      {
        password: result.data.password,
      }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }
  redirect("/login");
}
