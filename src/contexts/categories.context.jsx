import { createContext, useState, useEffect } from 'react';
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils.js';

// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // die categoryMap ist kein Array sondern ein object!
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
