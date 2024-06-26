"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import TextComp from "@/components/TextComp/TextComp";
import FullSizeOutlineTextField from "@/components/Textfield/FullSizeOutlineTextfield";
import apiLogin from "@/components/apiLogin";
import { PrimaryTextColor } from "@/styles/colorsCode";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import ForgotPassword from "./ForgotPassword";
import "./style.scss";

const Login = () => {
  const [loading, setloading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [InvalidUser, setInvalidUser] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState<string>("");

  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

  const router = useRouter();
  const contextDataHub = useContext(UseContextHook);
  const {
    setauth,
    setUserInfo,
    setReusableSnackBar,
    auth,
    ThemeColor,
    setThemeColor,
    setfontPropertyArr,
    setselectedFont,
  } = contextDataHub;

  if (
    !setauth ||
    !setUserInfo ||
    !setReusableSnackBar ||
    !setThemeColor ||
    !setfontPropertyArr ||
    !setselectedFont
  ) {
    return null;
  }

  const SubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvalidUser(false);
    // if (captchaTextInput === captchaText) {
    if (email?.length > 0 && password?.length > 0) {
      setEmptyError(false);
      // setErroeCaptcha(false);
      // setSuccesCaptcha(true);
      try {
        setloading(true);
        const res = await apiLogin.post("user/auth/login", { email, password });
        const data = await res.data;
        console.log(data);
        if (res.status === 200) {
          const resMe = await apiLogin.get("/user/me", {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          });

          const resData = await resMe?.data; // Extract data from response
          if (resMe.status === 200) {
            try {
              const resTheme = await apiLogin.get("/userSettings/getFont", {
                headers: {
                  Authorization: `Bearer ${data.accessToken}`,
                },
              });
              const resDataTheme = await resTheme?.data; // Extract data from response
              if (resTheme.status === 200) {
                setUserInfo(resData);
                setThemeColor(resDataTheme?.theme);
                setfontPropertyArr(resDataTheme?.fontProperties);
                setselectedFont(resDataTheme?.fontName);
                localStorage.setItem(
                  "theme",
                  JSON.stringify(resDataTheme?.theme)
                );
                localStorage.setItem(
                  "font",
                  JSON.stringify(resDataTheme?.fontName)
                );
                localStorage.setItem(
                  "fontProperty",
                  JSON.stringify(resDataTheme?.fontProperties)
                );
              }
            } catch (e: any) {
              console.log(e);
            }
            localStorage.setItem("accessToken", data?.accessToken);
            localStorage.setItem("refreshToken", data?.refreshToken);
            localStorage.setItem("expiresAt", data?.expiresAt);
            router.push("/");
            router.refresh();
            setauth(true);
          }
          // router.refresh();
        }
      } catch (e: any) {
        console.log(e?.response);
        if (e?.response) {
          setReusableSnackBar((prev) => ({
            severity: "error",
            message: String(
              e?.response?.data?.message
                ? e?.response?.data?.message
                : e?.response?.data?.error
            ),
            open: true,
          }));
        } else {
          setReusableSnackBar((prev) => ({
            severity: "error",
            message: `Error: ${e?.message}`,
            open: true,
          }));
        }
      } finally {
        setloading(false);
      }
    } else {
      setEmptyError(true);
    }
  };
  if (auth) {
    return null;
  }
  const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemail(event.target.value);
  };
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <div className="login-form" data-testid="login-form-id">
      {showForgotPassword && (
        <ForgotPassword
          setShowForgotPassword={setShowForgotPassword}
          setSucesSnackBar={setReusableSnackBar}
        />
      )}
      {!showForgotPassword && (
        <div className="login-form-content">
          <Image
            src="/images/prosol-logo.svg"
            alt="loding view"
            priority={true}
            width={150}
            height={50}
            style={{ margin: "5px 0" }}
          />
          <TextComp
            variant="subTitle"
            style={{ textAlign: "center", color: PrimaryTextColor }}
          >
            welcome to <span style={{ color: "#2752E3" }}>prosol ,</span>
            Please put your Login Credentials below to start
          </TextComp>

          <form onSubmit={SubmitHandler}>
            <div className="login-form-content-inputs">
              <TextComp
                variant="title"
                style={{ color: PrimaryTextColor }}
                data-testid="login-text"
              >
                LOGIN
              </TextComp>
              <FullSizeOutlineTextField
                type="text"
                placeholder="Username"
                id="input-username"
                size="small"
                value={email}
                autoComplete="off"
                onChange={usernameHandler}
              />
              <FullSizeOutlineTextField
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="input-password"
                value={password}
                onChange={passwordHandler}
                size="small"
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? (
                          <VisibilityIcon sx={{ fontSize: "1.3rem" }} />
                        ) : (
                          <VisibilityOffIcon sx={{ fontSize: "1.3rem" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {emptyError && (
                <TextComp
                  variant="body"
                  style={{ color: "red", fontWeight: "600" }}
                >
                  Username and password cannot be empty
                </TextComp>
              )}
              {InvalidUser && (
                <TextComp
                  variant="body"
                  style={{ color: "red", fontWeight: "600" }}
                >
                  Please enter the valid email and password
                </TextComp>
              )}
              <span
                onClick={() => {
                  setShowForgotPassword(true);
                }}
              >
                <TextComp
                  variant="body"
                  style={{
                    color: ThemeColor.primaryColor,
                    textAlign: "right",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Forget password?
                </TextComp>
              </span>
            </div>

            <FillButton
              style={{
                marginTop: "1rem",
                height: "2rem",
                width: "100%",
              }}
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Loading...." : "Login"}
            </FillButton>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
