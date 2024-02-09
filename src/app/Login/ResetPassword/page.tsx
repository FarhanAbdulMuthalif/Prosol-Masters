"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import apiLogin from "@/components/apiLogin";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import "./style.scss";
const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setloading] = useState(false);
  const [emptyError, setEmptyError] = useState({
    empty: false,
    notSame: false,
  });
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const MasterDetails = useContext(UseContextHook);
  const { setauth } = MasterDetails;
  // Extract token from the query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  console.log(token);
  if (!setauth) {
    return null;
  }

  const SubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.password?.length > 0 && password?.confirmPassword.length > 0) {
      setEmptyError({ empty: false, notSame: false });

      try {
        setloading(true);
        const res = await apiLogin.post(
          `/user/resetPassword?token=${token}`,
          password
        );
        const data = await res.data;
        console.log(data);
        console.log(res.status);
        if (res.status === 200) {
          router.push("/Login");

          // router.refresh();
        }
      } catch (e: any) {
        console.log(e?.response);
      } finally {
        setloading(false);
      }
    } else {
      setEmptyError((prev) => ({ ...prev, empty: true }));
    }
  };
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="reset-form">
      <form className="reset-form-content" onSubmit={SubmitHandler}>
        <Image
          src="/images/prosol-logo.svg"
          alt="loding view"
          width={150}
          height={50}
          className="logo-img-reset"
        />

        <div className="reset-form-content-inputs">
          <span>Enter Your new Password</span>

          {emptyError.notSame && (
            <span
              className="erroe-msg"
              style={{ color: "red", fontSize: ".9rem" }}
            >
              password and ConfirmPassword should be same
            </span>
          )}
          {emptyError.empty && (
            <span
              className="erroe-msg"
              style={{ color: "red", fontSize: ".9rem" }}
            >
              password and ConfirmPassword cannot be empty
            </span>
          )}

          <OutlineTextField
            type={showPassword.password ? "text" : "password"}
            placeholder="Enter New Password"
            size="small"
            value={password.password}
            fullWidth
            autoComplete="off"
            name="password"
            onChange={inputChangeHandler}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword((prev) => ({
                        ...prev,
                        password: !showPassword.password,
                      }));
                    }}
                  >
                    {showPassword.password ? (
                      <VisibilityIcon sx={{ fontSize: "1.3rem" }} />
                    ) : (
                      <VisibilityOffIcon sx={{ fontSize: "1.3rem" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <OutlineTextField
            type={showPassword.confirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            fullWidth
            value={password.confirmPassword}
            name="confirmPassword"
            onChange={inputChangeHandler}
            size="small"
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword((prev) => ({
                        ...prev,
                        confirmPassword: !showPassword.confirmPassword,
                      }));
                    }}
                  >
                    {showPassword.confirmPassword ? (
                      <VisibilityIcon sx={{ fontSize: "1.3rem" }} />
                    ) : (
                      <VisibilityOffIcon sx={{ fontSize: "1.3rem" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <FillButton
          className="fill-btn-reset"
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Loading....." : "SAVE"}
        </FillButton>
      </form>
    </div>
  );
};

export default ResetPassword;
