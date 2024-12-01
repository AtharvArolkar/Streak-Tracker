import loginBg from "/public/login-bg.jpg";
import Image from "next/image";
import { ReactElement } from "react";

import FormComponent from "@/components/form-component";

import { login } from "../../actions/login";

export default function Login(): ReactElement {
  return (
    <div className="w-full h-full relative flex flex-col sm:justify-center sm:items-center">
      <Image src={loginBg} alt="bg" className="-z-5 h-[300px] sm:hidden" />
      <FormComponent
        formAction={login}
        formChildrens={[
          {
            name: "identifier",
            type: "text",
            placeholder: "Email or phone number",
          },
          {
            name: "password",
            type: "password",
            placeholder: "Password",
          },
        ]}
        submitButtonName="Login"
        formTitle="Welcome! to Car Wash"
      />
    </div>
  );
}
