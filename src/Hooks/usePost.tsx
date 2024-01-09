import api from "@/components/api";
import { useEffect, useState } from "react";

const usePost = ({ url, data }: { url: string; data: any }) => {
  const [response, setSesponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await api.post(url, data);
        setSesponse(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred.")
        );
      } finally {
        setLoading(false);
      }
    };

    postData();
  }, [url, data]);

  return { response, loading, error };
};

export default usePost;
