"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import apiLogin from "@/components/apiLogin";
import Button from "@mui/material/Button";
import Image from "next/image";
import { SnackBarReusableProps } from "../../../TypesStore";
import "./ForgotPassword.css";

const ForgotPassword: React.FC<{
  setShowForgotPassword: (att: boolean) => void;
  setSucesSnackBar: Dispatch<SetStateAction<SnackBarReusableProps>>;
}> = ({ setShowForgotPassword, setSucesSnackBar }) => {
  const [emailText, setEmailText] = useState<string>("");
  const [loading, setloading] = useState(false);

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailText(event.target.value);
  };

  const BackToLoginSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setloading(true);
      const res = await apiLogin.post("/user/forgotPassword", {
        email: emailText,
      });
      const data = await res.data;
      if (res.status === 200) {
        setSucesSnackBar((prev) => ({
          severity: "success",
          message: "reset password link successfully sent to mention mail",
          open: true,
        }));
        setShowForgotPassword(false);
      }
    } catch (e: any) {
      console.log(e?.message);
      if (e?.message === "Network Error") {
        setSucesSnackBar((prev) => ({
          severity: "error",
          message: "Failed connection",
          open: true,
        }));
      }
    } finally {
      setloading(false);
    }
  };
  const handleDialogSave = () => {
    setShowForgotPassword(false);
  };
  const handleDialogError = () => {};

  return (
    <form onSubmit={BackToLoginSubmitHandler}>
      <div className="forgotPassword-form-content">
        <Image
          src="/images/prosol-logo.svg"
          alt="loding view"
          width={150}
          height={50}
          style={{ alignSelf: "center" }}
        />
        <p>
          Enter your registered e-mail below and we will send you reset
          instruction!
        </p>
        <span>Email</span>
        <OutlineTextField
          type="text"
          placeholder="Enter Email"
          id="input-email-forgot-password"
          onChange={emailHandler}
          size="small"
          required
        />
        <div className="button-div-forgotPassword">
          <p
            onClick={() => {
              setShowForgotPassword(false);
            }}
          >
            Back to Login
          </p>
          <Button
            sx={{
              height: "2rem",
            }}
            style={{ alignSelf: "flex-end" }}
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Loading" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
