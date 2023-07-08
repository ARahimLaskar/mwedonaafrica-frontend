import React, { useState, createContext } from "react";

export const myContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLogedin, setisLogedin] = useState(false);
  return (
    <div>
      <myContext.Provider value={{ isLogedin, setisLogedin }}>
        {children}
      </myContext.Provider>
    </div>
  );
}
