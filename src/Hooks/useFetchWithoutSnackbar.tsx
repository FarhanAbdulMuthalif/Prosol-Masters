import { UseContextHook } from "@/Provides/UseContextHook";
import api from "@/components/api";
import { useContext, useEffect, useState } from "react";

const useFetchWithoutSnackbar = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const ContextDataHub = useContext(UseContextHook);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (e: any) {
        console.log(e?.response);

        if (e?.response) {
        } else {
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
  }, [url]);

  return { data, loading, error };
};

export default useFetchWithoutSnackbar;
