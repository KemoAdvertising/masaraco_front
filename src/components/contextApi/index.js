import { createContext, useContext } from "react";

export const UserDetailContext = createContext({
  userDetail: {},
});

export const useDetailsData = () => useContext(UserDetailContext);
