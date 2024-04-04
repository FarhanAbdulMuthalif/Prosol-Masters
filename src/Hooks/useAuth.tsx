import { UseContextHook } from "@/Provides/UseContextHook";
import apiLogin from "@/components/apiLogin";
import { singleUserDataHandler } from "@/utils/UserDataExport";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const UseAuth = () => {
  // const [auth, setAuth] = useState(false);
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

        if (!storedAccessToken && !storedRefreshToken) {
          if (!auth && !currentRoute.split("/").includes("Login")) {
            router.push("/Login");
          }
          return;
        }

        let accessToken = storedAccessToken || "";
        if (storedAccessToken) {
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
              const refreshRes = await apiLogin.post(
                `/user/auth/refresh-token?token=${storedRefreshToken}`
              );
              accessToken = refreshRes?.data?.accessToken;
              localStorage.setItem("accessToken", accessToken);
            }
          }
        }

        const retryRes = await apiLogin.post(
          `/user/auth/validateToken?token=${accessToken}`
        );
        if (retryRes.status === 200) {
          SetContextAuth(true);
          singleUserDataHandler(accessToken, setUserInfo);
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
