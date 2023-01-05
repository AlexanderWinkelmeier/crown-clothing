// ? Datei, die alle verwendeten Datentypen enthält

// * ACTION TYPES
export const enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = 'categories/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'categories/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED = 'categories/FETCH_CATEGORIES_FAIL',
}

// Durch enum werden die drei Types nicht nur Strings, sondern  nur
// diese ganz spezifischen Strings 'categories/FETCH_CATEGORIES_START' etc.
// die Datentypisierung wird somit strenger

// * ein einzelnes Category Element
export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

// * eine Category
export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

// * eine Category Map
export type CategoryMap = {
  [key: string]: CategoryItem[];
};

// ein Map ist immer ein Objekt: hier wird ein Array in ein Objekt gemappt, d.h. verwandelt
// CategoryMap ist ein Array aus key-value-pairs
// value: eine CategoryItems-Array
// key: ein String
