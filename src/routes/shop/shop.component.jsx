import SHOP_DATA from '../../shop-data.json'; // importiert die gesamte json-Datei und speichert sie in SHOP_DATA

const Shop = () => {
  return (
    <div>
      {SHOP_DATA.map(({ id, name }) => (
        <div key={id}>
          <h1>{name}</h1>
        </div>
      ))}
      )
    </div>
  );
};

export default Shop;
