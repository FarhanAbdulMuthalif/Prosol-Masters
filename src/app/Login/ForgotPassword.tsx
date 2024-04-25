"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import TextComp from "@/components/TextComp/TextComp";
import FullSizeOutlineTextField from "@/components/Textfield/FullSizeOutlineTextfield";
import apiLogin from "@/components/apiLogin";
import { PrimaryTextColor } from "@/styles/colorsCode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { SnackBarReusableProps } from "../../../TypesStore";
import "./ForgotPassword.css";

const ForgotPassword: React.FC<{
  setShowForgotPassword: (att: boolean) => void;
  setSucesSnackBar: Dispatch<SetStateAction<SnackBarReusableProps>>;
}> = ({ setShowForgotPassword, setSucesSnackBar }) => {
  const [emailText, setEmailText] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [emptyError, setemptyError] = useState(false);
  const contextDataHub = useContext(UseContextHook);
  const { ThemeColor } = contextDataHub;
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailText(event.target.value);
  };

  const BackToLoginSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (emailText.length < 1) {
      setemptyError(true);
      return null;
    }
    setemptyError(false);
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
      console.log(e?.response);
      if (e?.response) {
        setSucesSnackBar((prev) => ({
          severity: "error",
          message: String(
            e?.response?.data?.message
              ? e?.response?.data?.message
              : e?.response?.data?.error
          ),
          open: true,
        }));
      } else {
        setSucesSnackBar((prev) => ({
          severity: "error",
          message: `Error: ${e?.message}`,
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
          priority={true}
          alt="loding view"
          width={150}
          height={50}
          style={{ alignSelf: "center" }}
        />
        <TextComp
          variant="subTitle"
          style={{ color: PrimaryTextColor, textAlign: "center" }}
        >
          Enter your registered e-mail below and we will send you reset
          instruction!
        </TextComp>
        <TextComp variant="title" style={{ color: PrimaryTextColor }}>
          EMAIL
        </TextComp>

        <FullSizeOutlineTextField
          type="text"
          placeholder="Enter Email"
          id="input-email-forgot-password"
          onChange={emailHandler}
          size="small"
        />
        {emptyError && (
          <TextComp variant="body" style={{ color: "red", fontWeight: "600" }}>
            Please enter the email to send reset link
          </TextComp>
        )}
        <div className="button-div-forgotPassword">
          <p
            onClick={() => {
              setShowForgotPassword(false);
            }}
          >
            <TextComp
              variant="subTitle"
              style={{
                color: ThemeColor.primaryColor,
                display: "flex",
                gap: "3px",
                alignItems: "center",
              }}
            >
              <ArrowBackIcon sx={{ fontSize: "0.8rem" }} />
              Back to Login
            </TextComp>
          </p>
          <FillButton
            sx={{
              height: "2rem",
            }}
            style={{ alignSelf: "flex-end" }}
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Loading" : "Submit"}
          </FillButton>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
