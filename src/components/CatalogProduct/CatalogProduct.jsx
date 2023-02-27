import { API_URL } from '../../const';
import style from './CatalogProduct.module.css';

const CatalogProduct = ({ item }) => {
  const { title, price, weight, description, image} = item;

  return (
    <article className={style.product}>
        <img className={style.image} src={`${API_URL}/${image}`} alt={title} />

        <p className={style.price}>{price}<span className="currency">₽</span></p>

        <h3 className={style.title}>
          <button className={style.detail}>{title}</button>
        </h3>

        <p className={style.weight}>{weight}г</p>

        <button className={style.add} type="button">Добавить</button>
    </article>
  )
};

export default CatalogProduct;