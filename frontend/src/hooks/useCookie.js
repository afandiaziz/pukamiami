import { useState } from "react";
import cookieCutter from "cookie-cutter";

export const useCookie = () => {
  const [value, setValue] = useState(null);

  const setItem = (key, value) => {
    cookieCutter.set(key, value);
    setValue(value);
  };

  const getItem = (key) => {
    const value = cookieCutter.get(key);
    setValue(value);
    return value;
  };

  return { value, setItem, getItem };
};
