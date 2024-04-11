"use server";

import * as auth from "@/auth";
import { USER_API } from "@/services/api-end-point/user";
import clientAxios from "@/services/config";
import { redirect } from "next/navigation";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(11).max(14),
  password: z.string().min(8)
});

interface CreateUserFormState {
  errors: {
    name?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    _form?: string[];
  };
}

export async function signIn() {
  return auth.signIn("github");
}

export async function credentialsSignIn(
  formState: CreateUserFormState,
  formData: FormData
): Promise<CreateUserFormState> {
  const email = formData?.get("email") as string;
  const password = formData?.get("password") as string;
  const requestBody = {
    email,
    password
  };
  return clientAxios.post("http://localhost:4321/users/login", requestBody).then(res => {
    if (!(res as any).data?.user) {
      return {
        errors: {
          _form: ["Invalid Credentials"],
        },
      };
    }
    const user = (res as any)?.data;
    const data = {
      accessToken: user.accessToken,
      name: user.user.name,
      email: user.user.email,
      id: user.user._id,
      image: user.user.image,
    }
    auth.signIn("credentials", data);
  });

}


export async function credentialsSignUp(
  formState: CreateUserFormState,
  formData: FormData
): Promise<CreateUserFormState> {
  const role = formData.get("role") as string;
  const result = createUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      errors: (result as any).error.flatten().fieldErrors,
    };
  }

  try {
    await clientAxios.post(`${USER_API.user_sign_in}`, {
      name: result.data.name,
      username: result.data.email,
      email: result.data.email,
      phone: result.data.phone.startsWith("+88") ? result.data.phone : "+88" + result.data.phone,
      password: result.data.password,
      role,
    });
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
  // return auth.signIn("credentials", { name, email, phone, password, role });
}