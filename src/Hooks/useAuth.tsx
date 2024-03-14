import { UseContextHook } from "@/Provides/UseContextHook";
import apiLogin from "@/components/apiLogin";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const UseAuth = () => {
  const [auth, setAuth] = useState(false);
  const {
    setauth: SetContextAuth,
    setUserInfo,
    setReusableSnackBar,
  } = useContext(UseContextHook);
  const router = useRouter();
  const currentRoute = usePathname();

  useEffect(() => {
    // Check if the user is authenticated (you might want to improve this logic)
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    async function fetch() {
      if (storedAccessToken) {
        try {
          const res = await apiLogin.post(
            `/user/auth/validateToken?token=${storedAccessToken}`
          );
          if (res.status === 200) {
            setAuth(true);

            if (SetContextAuth) {
              SetContextAuth(true);
            }
            const resMe = await apiLogin.get("/user/me", {
              headers: {
                Authorization: `Bearer ${storedAccessToken}`,
              },
            });

            const resData = await resMe?.data; // Extract data from response
            if (resMe.status === 200) {
              if (setUserInfo) {
                setUserInfo(resData);
              }
            }
          }
        } catch (e: any) {
          // localStorage.removeItem("accessToken");
          // If access token is expired, try to refresh it using the refresh token
          if (e.response && e.response.status === 400 && storedRefreshToken) {
            try {
              const refreshRes = await apiLogin.post(
                `/user/auth/refresh-token?token=${storedRefreshToken}`
              );

              // Update the access token in local storage
              localStorage.setItem("accessToken", refreshRes.data.accessToken);

              // Retry the original request with the new access token
              const retryRes = await apiLogin.post(
                `/user/auth/validateToken?token=${refreshRes.data.accessToken}`
              );

              if (retryRes.status === 200) {
                setAuth(true);

                if (SetContextAuth) {
                  SetContextAuth(true);
                }
                return;
              }
            } catch (refreshError: any) {
              console.log(refreshError?.response);
              if (!setReusableSnackBar) return;
              if (refreshError?.response) {
                setReusableSnackBar((prev) => ({
                  severity: "error",
                  message: String(refreshError?.response?.data?.message),
                  open: true,
                }));
              } else {
                setReusableSnackBar((prev) => ({
                  severity: "error",
                  message: `Error: ${refreshError?.message}`,
                  open: true,
                }));
              }
              router.push("/Login");
              setAuth(false);
              if (SetContextAuth) {
                SetContextAuth(false);
              }
              console.log(e?.response);
              if (!setReusableSnackBar) return;
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
              console.error("Error refreshing token:", refreshError);
            }
          }

          // If refresh attempt fails or refresh token is missing, redirect to login
          router.push("/Login");
          setAuth(false);
          if (SetContextAuth) {
            SetContextAuth(false);
          }
        }
      } else {
        if (!auth && !currentRoute.split("/").includes("/Login")) {
          router.push("/Login");
        }
      }
    }
    fetch();
  }, [
    router,
    SetContextAuth,
    setUserInfo,
    setReusableSnackBar,
    currentRoute,
    auth,
  ]);

  return auth;
};

export default UseAuth;
