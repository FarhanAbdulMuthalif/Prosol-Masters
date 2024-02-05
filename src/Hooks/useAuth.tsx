import { UseContextHook } from "@/Provides/UseContextHook";
import apiLogin from "@/components/apiLogin";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const UseAuth = () => {
  const [auth, setAuth] = useState(false);
  const { setauth: SetContextAuth } = useContext(UseContextHook);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (you might want to improve this logic)
    const storedAccessToken = localStorage.getItem("accessToken");
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
          }
        } catch (e: any) {
          router.push("/Login");
          setAuth(false);
          if (SetContextAuth) {
            SetContextAuth(false);
          }
        }
      }
    }
    fetch();
  }, [router, SetContextAuth]);

  return auth;
};

export default UseAuth;
