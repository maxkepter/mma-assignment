import React, { createContext, useContext } from 'react';
import { useFavoritesStorage } from '../hooks/useFavorites';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // All favorites logic lives in the custom hook
  const favoritesState = useFavoritesStorage();

  return (
    <FavoritesContext.Provider value={favoritesState}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
