import { useCallback, useEffect, useState } from "react";

export interface UseFetchProps {
  url: string;
  autoFetch?: boolean;
}

export const useFetch = <T>({ url, autoFetch = true }: UseFetchProps) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [path, setPath] = useState<string>();

  const buildUrl = useCallback(
    (url: string) => {
      if (url && !path) return url;

      console.log("Fetching data for path:");

      return `${url}${path}`;
    },
    [path]
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(buildUrl(url));

      if (!response.ok) {
        throw new Error("An error occured when getting data");
      }

      const retrievedData = await response.json();

      setData(retrievedData);
    } catch {
      setError("An error occured when attempting to fetch data");
    } finally {
      setLoading(false);
    }
  }, [buildUrl, url]);

  useEffect(() => {
    if (autoFetch || path) {
      console.log("Path changed to:", path);
      fetchData();
    }
  }, [autoFetch, fetchData, path]);

  return { data, loading, error, fetchData, setPath };
};
