import { createContext, useState } from "react";

export const themeContext = createContext()


export const DataProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(false)

  return (
        <themeContext.Provider value={[darkTheme, setDarkTheme]}>
                {props.children}   
        </themeContext.Provider>
  )
}