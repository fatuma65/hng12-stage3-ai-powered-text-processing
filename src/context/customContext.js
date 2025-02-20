import { createContext, useContext } from "react";

export const InterfaceContext = createContext(null);

export const useChat = () => {
  return useContext(InterfaceContext);
};
