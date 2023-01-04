export const enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = 'categories/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'categories/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED = 'categories/FETCH_CATEGORIES_FAIL',
}

// Durch enum werden die drei Types nicht nur Strings, sondern  nur
// diese ganz spezifischen Strings

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};
