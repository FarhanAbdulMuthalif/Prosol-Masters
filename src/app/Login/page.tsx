"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import apiLogin from "@/components/apiLogin";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
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
  const MasterDetails = useContext(UseContextHook);
  const { setauth, setUserInfo, setReusableSnackBar, auth } = MasterDetails;

  if (!setauth || !setUserInfo || !setReusableSnackBar) {
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
            setUserInfo(resData);

            localStorage.setItem("accessToken", data?.accessToken);
            localStorage.setItem("refreshToken", data?.refreshToken);

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
    <div className="login-form">
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
            width={150}
            height={50}
            style={{ margin: "5px 0" }}
          />
          <p>
            welcome to <span style={{ color: "#2752E3" }}>prosol ,</span>
            Please put your Login Credentials below to start
          </p>
          <form onSubmit={SubmitHandler}>
            <div className="login-form-content-inputs">
              <span>Login</span>

              {emptyError && (
                <span
                  className="erroe-msg"
                  style={{ color: "red", fontSize: ".9rem" }}
                >
                  Username and password cannot be empty
                </span>
              )}
              {InvalidUser && (
                <span
                  className="erroe-msg"
                  style={{ color: "red", fontSize: ".9rem" }}
                >
                  Please enter the valid email and password
                </span>
              )}

              <OutlineTextField
                type="text"
                placeholder="Username"
                id="input-username"
                size="small"
                value={email}
                autoComplete="off"
                onChange={usernameHandler}
              />
              <OutlineTextField
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
              <span
                onClick={() => {
                  setShowForgotPassword(true);
                }}
                style={{
                  fontSize: ".8rem",
                  color: "blue",
                  textAlign: "right",
                  cursor: "pointer",
                }}
              >
                Forget password?
              </span>
            </div>

            <Button
              sx={{
                marginTop: "1rem",
                height: "2rem",
                width: "100%",
              }}
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Loading...." : "Login"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
