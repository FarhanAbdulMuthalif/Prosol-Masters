import apiLogin from "@/components/apiLogin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
  id: number;
  firstName: string;
  // Add other user-related information as needed
}

interface Auth {
  accessToken: string | null;
  user: User | null;
  isValid: boolean;
}

const useAuth = (): Auth => {
  const [auth, setAuth] = useState<Auth>({
    accessToken: null,
    user: null,
    isValid: false,
  });

  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (you might want to improve this logic)
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      // Validate the token on the server
      apiLogin
        .post("/user/auth/validateToken?", { token: storedAccessToken })
        .then((response) => {
          const isValid = response.data.message;

          setAuth({
            accessToken: isValid ? storedAccessToken : null,
            user: auth.user ? auth.user : null,
            isValid,
          });

          // Redirect to login if token is not valid
          if (!isValid) {
            router.push("/login");
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
        });
    } else {
      setAuth({
        accessToken: null,
        user: null,
        isValid: false,
      });

      // Redirect to login if no token is found
      router.push("/login");
    }
  }, [router, auth.user]);

  return auth;
};

export default useAuth;
