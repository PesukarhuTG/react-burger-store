import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import style from "./Catalog.module.css";
import Container from "../Container/Container";
import Order from "../Order/Order";
import CatalogProduct from "../CatalogProduct/CatalogProduct";
import { productRequestAsync } from '../../store/product/productSlice';
import Message from '../Message/Message';


const Catalog = () => {
  const { products } = useSelector((state) => state.product);
  const { category, activeCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category.length) {
      dispatch(productRequestAsync(category[activeCategory].title));
    }
  }, [category, activeCategory])

  return (
    <section className={style.catalog}>
      <Container>
        <div className={style.container}>
          <Order />

          <div className={style.wrapper}>
            <h2 className={style.title}>{category[activeCategory]?.rus}</h2>

            <div className={style.wrap_list}>
              {products.length ? (
                <ul className={style.list}>
                  {products.map(item => (
                    <li className={style.item} key={item.id}>
                      <CatalogProduct item={item} />
                    </li>
                  ))}
                </ul>
                ) : (
                <Message text={'К сожалению, категория пока пуста'}/>
              )}
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
};

export default Catalog;