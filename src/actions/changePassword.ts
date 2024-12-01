"use server";

import { AxiosError } from "axios";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { callApi } from "@/helpers/api-service";
import { checkErrorResponse } from "@/helpers/response-checker";
import { apiRoutes, paths } from "@/lib/routes";
import { ApiMethod, ApiResponse, FormError } from "@/types/common";
import { ChangePasswordPayload } from "@/types/user";

export async function changePassword(
  _: any,
  formData: FormData
): Promise<FormError> {
  const authUser = await auth();

  const identifier = formData.get("identifier");
  const oldPassword = formData.get("oldPassword");
  const newPassword = formData.get("newPassword");
  const confirmNewPassword = formData.get("confirmNewPassword");
  const errorObject: FormError = {
    errors: {
      identifier: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      apiError: "",
    },
  };
  if (authUser) {
    if (!oldPassword) {
      errorObject.errors.oldPassword = "Please enter your old password";
    }
  } else {
    if (!identifier) {
      errorObject.errors.identifier = "Please enter your email or phone number";
    }
  }
  if (!newPassword) {
    errorObject.errors.newPassword = "Please enter your new password";
  }
  if (!confirmNewPassword) {
    errorObject.errors.confirmNewPassword = "Please re-enter your new password";
  }
  if (
    errorObject?.errors?.email?.trim() ||
    errorObject?.errors?.oldPassword?.trim() ||
    errorObject?.errors?.newPassword?.trim() ||
    errorObject?.errors?.confirmNewPassword?.trim()
  ) {
    return errorObject;
  }

  if (newPassword !== confirmNewPassword) {
    errorObject.errors.confirmNewPassword =
      "Please make sure your password matches the new password";
    return errorObject;
  }

  const payload: ChangePasswordPayload = {
    newPassword: confirmNewPassword?.toString()!,
  };

  if (authUser) {
    payload.identifier = authUser.user._id.toString();
    payload.oldPassword = oldPassword?.toString();
  } else {
    payload.identifier = identifier?.toString();
  }

  try {
    await callApi<ApiResponse>(
      apiRoutes.changePassword,
      ApiMethod.POST,
      authUser?.accessToken,
      payload
    );
  } catch (error) {
    const apiError = error as AxiosError<ApiResponse>;
    await checkErrorResponse(apiError);
    errorObject.errors.apiError =
      apiError.response?.data.message ?? "Something went wrong";
    return errorObject;
  }
  redirect(paths.home);
}
