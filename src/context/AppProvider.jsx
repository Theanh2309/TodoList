import React, { createContext, useState } from "react";
export const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  return (
    <AppContext.Provider value={{ selectedCategoryId, setSelectedCategoryId }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
