import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useUserStatus() {
    const { user } = useContext(AuthContext);
    const isUserLoggedin = user ? true : false;
    return isUserLoggedin;
  }

export default useUserStatus;