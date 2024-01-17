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
  // let captcha;
  // let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

  // const [captchaText, setCaptchaText] = useState("");
  // const [captchaTextInput, setCaptchaTextInput] = useState("");
  // const [errorCaptcha, setErroeCaptcha] = useState(false);
  // const [succesCaptcha, setSuccesCaptcha] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState<string>("");

  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  // const generate = () => {
  //   // console.log(status)
  //   let first = alphabets[Math.floor(Math.random() * alphabets.length)];
  //   let second = Math.floor(Math.random() * 10);
  //   let third = Math.floor(Math.random() * 10);
  //   let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
  //   let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
  //   let sixth = Math.floor(Math.random() * 10);
  //   captcha =
  //     first.toString() +
  //     second.toString() +
  //     third.toString() +
  //     fourth.toString() +
  //     fifth.toString() +
  //     sixth.toString();

  //   setCaptchaText(captcha);
  //   setCaptchaTextInput("");
  // };
  // const CaptchaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   setCaptchaText(event.target.value);
  // };
  // const CaptchaInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   setCaptchaTextInput(event.target.value);
  // };
  const router = useRouter();
  const MasterDetails = useContext(UseContextHook);
  const { setauth } = MasterDetails;

  if (!setauth) {
    return null;
  }
  const SubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (captchaTextInput === captchaText) {
    if (email?.length > 0 && password?.length > 0) {
      setEmptyError(false);
      // setErroeCaptcha(false);
      // setSuccesCaptcha(true);
      console.log(email);
      console.log(password);
      const res = await apiLogin.post("user/auth/login", { email, password });
      const data = await res.data;
      console.log(data);
      console.log(res.status);
      if (res.status === 200) {
        localStorage.setItem("accessToken", data?.accessToken);
        localStorage.setItem("refreshToken", data?.refreshToken);

        router.push("/Masters");
        router.refresh();
        setauth(true);
        // router.refresh();
      }
    } else {
      setEmptyError(true);
    }
    // } else {
    //   setErroeCaptcha(true);
    //   setSuccesCaptcha(false);
    //   setCaptchaTextInput("");
    // }
  };
  const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemail(event.target.value);
  };
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <div className="login-form">
      {showForgotPassword && (
        <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
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

            {/* <div className="div_capt" style={{}}>
              <p
                style={{
                  textAlign: "left",
                  marginBottom: ".5rem",
                  marginTop: 0,
                  color: "#515151",
                  fontSize: ".9rem",
                }}
              >
                Captcha Verification *
              </p>
              <div className="form-group">
                <TextField
                  type="text"
                  id="captchaInputPlace"
                  value={captchaTextInput}
                  placeholder="Enter Captcha"
                  onChange={CaptchaInputHandler}
                />
                <TextField
                  type="text"
                  id="captchaPlace"
                  disabled
                  value={captchaText}
                  onChange={CaptchaHandler}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onDragStart={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onCopy={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
                <AutorenewIcon
                  onClick={generate}
                  sx={{ marginRight: ".8rem", color: "blue" }}
                />
              </div>
              {!errorCaptcha && (
                <span style={{ fontSize: ".8rem", color: "#939393" }}>
                  Type the character you see in the picture above
                </span>
              )}
              {errorCaptcha && !succesCaptcha && (
                <p
                  style={{
                    fontSize: ".8rem",
                    color: "red",
                    textAlign: "left",
                    margin: 0,
                  }}
                >
                  Invalid Captcha Try Again!!
                </p>
              )}
              {succesCaptcha && !errorCaptcha && (
                <p style={{ color: "green", textAlign: "left" }}>
                  Captcha Matched
                </p>
              )}
              
            </div> */}
            <Button
              sx={{
                marginTop: "2rem",
                height: "2rem",
                width: "100%",
              }}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
