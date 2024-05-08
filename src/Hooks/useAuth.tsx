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
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedExpiresAt = localStorage.getItem("expiresAt");

    let accessToken = storedAccessToken || "";
    let refreshToken = storedRefreshToken || "";
    let expiresAtTxt = storedExpiresAt || "";
    if (!storedAccessToken || !storedExpiresAt || !storedRefreshToken) {
      refreshTokenHandler();
      return;
    }
    const expiresAt = parseCustomDateString(storedExpiresAt);
    const now = new Date();
    async function refreshTokenHandler() {
      if (!SetContextAuth || !setUserInfo || !setReusableSnackBar) return;
      try {
        const refreshRes = await apiLogin.post(
          `/user/auth/refresh-token?token=${storedRefreshToken}`
        );
        const refreshData = await refreshRes.data;
        if (refreshRes.status === 200) {
          accessToken = refreshData?.accessToken;
          refreshToken = refreshData?.refreshToken;
          expiresAtTxt = refreshData?.expiresAt;
          localStorage.setItem("accessToken", refreshData?.accessToken);
          localStorage.setItem("refreshToken", refreshData?.refreshToken);
          localStorage.setItem("expiresAt", refreshData?.expiresAt);
          SetContextAuth(true);
          singleUserDataHandler(refreshData?.accessToken, setUserInfo);
        }
      } catch (e: any) {
        console.error("Error in authentication:", e);
        router.push("/Login");
        SetContextAuth(false);
        setReusableSnackBar((prev) => ({
          severity: "error",
          message: e?.response?.data?.message || `Error: ${e?.message}`,
          open: true,
        }));
      }
    }
    async function fetchData() {
      if (!SetContextAuth || !setUserInfo || !setReusableSnackBar) return;
      try {
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
              refreshTokenHandler();
            }
          }
        } else {
          refreshTokenHandler();
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
