import { UseContextHook } from "@/Provides/UseContextHook";
import api from "@/components/api";
import { useContext, useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const ContextDataHub = useContext(UseContextHook);
  const { setReusableSnackBar } = ContextDataHub;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (e: any) {
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
        // console.log(error?.message);

        // setError(
        //   error instanceof Error
        //     ? error
        //     : new Error("An unknown error occurred.")
        // );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, setReusableSnackBar]);

  return { data, loading, error };
};

export default useFetch;
