export const selectCategoriesMap = (state) => {
  console.log('Selector fired');
  return state.categories.categories.reduce((acc, category) => {
    const { title, items } = category; // destructuring von category, d.h. eines einzelnen Elements aus dem Array
    acc[title.toLowerCase()] = items;
    // Zugriff auf ein Element des Objekts mittels Klammer-Notation und den items zuweisen
    // die einzelnen kleingeschriebenen title sollen die items  des JavaScript-Objekts sein
    return acc;
  }, {});
};

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
