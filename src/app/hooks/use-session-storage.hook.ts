import { useState } from "react";

export const useSessionStorage = () => {
  const hasSessionStorageItem = (key: string) => {
    return sessionStorage.getItem(key);
  };
  const setSessionStorageItem = (key: string, data: any) => {
    return sessionStorage.setItem(key, JSON.stringify(data));
  };
  const getSessionStorageItem = (key: string) => {
    return sessionStorage.getItem(key);
  };
  const removeSessionStorageItem = (key: string) => {
    return sessionStorage.removeItem(key);
  };
  return {
    setSessionStorageItem,
    getSessionStorageItem,
    removeSessionStorageItem,
    hasSessionStorageItem,
  };
};
