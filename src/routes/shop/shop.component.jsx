import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

const Shop = () => {
  return (
    <Routes>
      {/* Haupt-Route */}
      <Route index element={<CategoriesPreview />} />
      {/* Sub-Routes: wenn in die URL /shop/sneakers eingegeben oder darauf umgeleitet wird,
      kann in der Komponente "Category" über den Hook useParams darauf zugegriffen werden;
      In App.js muss über shop/* angegeben werden, dass shop Sub-Routes hat */}
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
