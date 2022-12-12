import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories; // State-Slice

// ! 1. Memoized Selektor
export const selectCategories = createSelector(
  // Array bestehend aus Input-Selektoren:
  // welche Slices von Redux sollen verwendet werden, um einen Output zu erzeugen
  // hier: nur der selectCategoryReducer, d.h. state.categories
  [selectCategoryReducer],
  // der Output-Selektor mit den Argumenten aus den Input-Selektoren, hier: nur ein Argument
  // und den Werten aus dieser Slice, den categories-Werten
  (categoriesSlice) => categoriesSlice.categories
);

// Der memoized Selektor wird nur dann ausgeführt, wenn sich der Input-Selektor "selectCategoryReducer"
// verändert hat, ansonsten nicht

// ! 2. Memoized Selektor
export const selectCategoriesMap = createSelector(
  [selectCategories], // hier ist der Input-Selektor, der obige memoized Selektor mit den categories-Array als Output
  // Output-Selektor
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

// Hier wird ein Array (state.categories.categories) in ein JavaScript-Objekt (map) transformiert:
// Der Startwert ist ein leeres JavaScript-Object {}; das ist der acc (Akkumulator) beim ersten Durchlauf
// Zum Schluss wird immer der Akkumulator als reduzierter Wert zurückgegeben, hier eine Map, d.h. ein
// JavaScript-Objekt

// Struktur des json-Objekts = categoryMap
/*
{
  hats: {
    title: 'Hats',
    items: [
      {},
      {}
    ]
  },
  sneakers: {
    title: 'Sneakers',
    items: [
      {},
      {}
    ]
  }
}
*/
