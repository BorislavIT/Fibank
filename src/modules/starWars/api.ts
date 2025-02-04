import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { IPeopleResponse, ISwapiResponse } from "./model";
import { swapiPaths } from "../../shared/api/swapi/constant";
import { swapiResultsPerRequest } from "./constant";
import swapiClient from "../../shared/api/swapi/swapi";

export const getCacheKey = (page: number | null, search: string) =>
  `people-page-${page}-search-${search}`;

export const saveToCache = (key: string, data: any) => {
  const cacheEntry = {
    timestamp: new Date().getTime(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
};

export const getFromCache = (key: string) => {
  const cacheEntry = localStorage.getItem(key);
  if (!cacheEntry) return null;

  const { timestamp, data } = JSON.parse(cacheEntry);
  const now = new Date().getTime();
  const cacheDuration = 5 * 60 * 1000;

  if (now - timestamp < cacheDuration) {
    return data;
  }

  localStorage.removeItem(key);
  return null;
};

export const useSwapi = <T>(
  path: string,
  options: AxiosRequestConfig = {}
): ISwapiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = getCacheKey(options.params?.page, options.params?.search);
    const cachedData = getFromCache(cacheKey);

    if (cachedData) {
      setData(cachedData);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await swapiClient.get<T>(path, {
          signal: controller.signal,
          ...options,
        });
        setData(response.data);
        saveToCache(cacheKey, response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errorMessage = err.response?.data?.message || err.message;
          if (!axios.isCancel(err)) {
            setError(errorMessage);
          }
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [path, options.params?.page, options.params?.search]);

  return { data, isLoading, error };
};

export const usePeople = (page: number | null, search: string) => {
  const { data, isLoading, error } = useSwapi<IPeopleResponse>(
    `${swapiPaths.people}`,
    {
      params: { page, search },
    }
  );

  const entitiesCount = data?.count ?? 0;
  const lastPage = Math.ceil(entitiesCount / swapiResultsPerRequest);

  return {
    data: data?.results,
    isLoading,
    error,
    count: data?.count,
    lastPage,
  };
};
