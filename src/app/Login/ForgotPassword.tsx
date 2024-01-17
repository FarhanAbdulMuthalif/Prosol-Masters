"use client";
import React, { useState } from "react";

import { TextField } from "@mui/material";
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

  const BackToLoginSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
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
        <TextField
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
    </form>
  );
};

export default ForgotPassword;
