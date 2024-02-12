import { UseContextHook } from "@/Provides/UseContextHook";
import apiLogin from "@/components/apiLogin";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const UseAuth = () => {
  const [auth, setAuth] = useState(false);
  const { setauth: SetContextAuth, setUserInfo } = useContext(UseContextHook);
  const router = useRouter();

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
          localStorage.removeItem("accessToken");
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
            } catch (refreshError) {
              router.push("/Login");
              setAuth(false);
              if (SetContextAuth) {
                SetContextAuth(false);
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
      }
    }
    fetch();
  }, [router, SetContextAuth, setUserInfo]);

  return auth;
};

export default UseAuth;
