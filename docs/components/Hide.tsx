import React from "react";
import { useLocalStorage } from "./useLocalStorage";

export default ({ children }) => {
    const [show] = useLocalStorage("show", false);
    return <div>{show && children}</div>;
};
