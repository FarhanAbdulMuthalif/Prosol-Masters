"use client";
import React, { useState } from "react";

import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import Button from "@mui/material/Button";
import Image from "next/image";
import "./ForgotPassword.css";

const ForgotPassword: React.FC<{
  setShowForgotPassword: (att: boolean) => void;
}> = ({ setShowForgotPassword }) => {
  const [emailText, setEmailText] = useState<string>("");

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailText(event.target.value);
  };
  const [sucesSnackBar, setSucesSnackBar] = useState(false);

  const BackToLoginSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await api.post("/user/forgotPassword", { email: emailText });
      const data = await res.data;
      if (res.status === 200) {
        setSucesSnackBar(true);
        setShowForgotPassword(false);
      }
    } catch (e: any) {
      console.log(e?.response);
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
          >
            Submit
          </Button>
        </div>
      </div>
      <ReusableSnackbar
        message={`Password Send Sucessfully To Mentioned Email!`}
        severity="success"
        setOpen={setSucesSnackBar}
        open={sucesSnackBar}
      />
    </form>
  );
};

export default ForgotPassword;
