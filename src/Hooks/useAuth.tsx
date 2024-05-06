import { UseContextHook } from "@/Provides/UseContextHook";
import apiLogin from "@/components/apiLogin";
import { parseCustomDateString } from "@/utils/Date/ParseDate";
import { singleUserDataHandler } from "@/utils/UserDataExport";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const UseAuth = () => {
  const {
    setauth: SetContextAuth,
    setUserInfo,
    setReusableSnackBar,
    auth,
  } = useContext(UseContextHook);
  const router = useRouter();
  const currentRoute = usePathname();

  useEffect(() => {
    async function fetchData() {
      if (!SetContextAuth || !setUserInfo || !setReusableSnackBar) return;
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        const storedExpiresAt = localStorage.getItem("expiresAt");

        if (!storedAccessToken || !storedExpiresAt || !storedRefreshToken) {
          if (!auth && !currentRoute.split("/").includes("Login")) {
            router.push("/Login");
          }
          return;
        }
        const expiresAt = parseCustomDateString(storedExpiresAt);
        const now = new Date();

        let accessToken = storedAccessToken || "";
        let refreshToken = storedRefreshToken || "";
        let expiresAtTxt = storedExpiresAt || "";
        if (expiresAt > now && storedAccessToken) {
          try {
            const res = await apiLogin.post(
              `/user/auth/validateToken?token=${storedAccessToken}`
            );
            if (res.status === 200) {
              SetContextAuth(true);
              singleUserDataHandler(storedAccessToken, setUserInfo);
              return;
            }
          } catch (e: any) {
            if (storedRefreshToken) {
              try {
                const refreshRes = await apiLogin.post(
                  `/user/auth/refresh-token?token=${storedRefreshToken}`
                );
                if (refreshRes.status === 200) {
                  accessToken = refreshRes?.data?.accessToken;
                  refreshToken = refreshRes?.data?.refreshToken;
                  expiresAtTxt = refreshRes?.data?.expiresAt;
                  localStorage.setItem("accessToken", accessToken);
                  localStorage.setItem("refreshToken", refreshToken);
                  localStorage.setItem("expiresAt", expiresAtTxt);
                  SetContextAuth(true);
                  singleUserDataHandler(storedAccessToken, setUserInfo);
                }
              } catch (e: any) {
                router.push("/Login");
                SetContextAuth(false);
              }
            }
          }
        } else {
          const refreshRes = await apiLogin.post(
            `/user/auth/refresh-token?token=${storedRefreshToken}`
          );
          if (refreshRes.status === 200) {
            accessToken = refreshRes?.data?.accessToken;
            refreshToken = refreshRes?.data?.refreshToken;
            expiresAtTxt = refreshRes?.data?.expiresAt;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("expiresAt", expiresAtTxt);
            SetContextAuth(true);
            singleUserDataHandler(storedAccessToken, setUserInfo);
          }
        }
      } catch (error: any) {
        console.error("Error in authentication:", error);
        router.push("/Login");
        SetContextAuth(false);
        setReusableSnackBar((prev) => ({
          severity: "error",
          message: error?.response?.data?.message || `Error: ${error?.message}`,
          open: true,
        }));
      }
    }

    fetchData();
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
