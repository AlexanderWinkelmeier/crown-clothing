import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

import ProductCard from '../../components/product-card/product-card.component';

import { Title, CategoryContainer } from './category.styles';

const Category = () => {
  console.log('Category Component re-renders');
  const categoriesMap = useSelector(selectCategoriesMap);
  const { category } = useParams();

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    console.log('useEffect fired and calling setProducts');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
