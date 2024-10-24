import React, { createContext, useState, useEffect } from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      // Listen to the loading events dispatched by Axios interceptors
      const handleLoading = (event) => {
        setLoading(event.detail);
      };
  
      window.addEventListener("loading", handleLoading);
  
      return () => {
        window.removeEventListener("loading", handleLoading);
      };
    }, []);
  
    return (
      <LoadingContext.Provider value={loading}>
        {children}
      </LoadingContext.Provider>
    );
  };