import { useContext } from "react";
import { userContext } from "../Context/user.context";

export const useUserContext = () => useContext(userContext);