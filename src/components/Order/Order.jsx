import style from  "./Order.module.css";
import OrderGoods from "../OrderGoods/OrderGoods";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { orderRequestAsync } from "../../store/order/orderSlice";
import { openModal } from "../../store/modalDelivery/modalDeliverySlice";
import classNames from "classnames";

const Order = () => {
  const { totalPrice, totalCount, orderGoods, orderList } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const [openOrder, setOpenOrder] = useState(false);

  useEffect(() => {
    dispatch(orderRequestAsync());
  }, [orderList.length]);

  return (
    <div className={classNames(style.order, openOrder ? style.order_open : 'order_open') }>
      <section className={style.wrapper}>
        <div className={style.header} tabIndex="0" role="button" onClick={() => {setOpenOrder(!openOrder)}}>
          <h2 className={style.title}>Корзина</h2>

          <span className={style.count}>{totalCount}</span>
        </div>

        <div className={style.wrap_list}>
          <ul className={style.list}>
            {orderGoods.map((item) => <OrderGoods key={item.id} {...item} />)}
          </ul>

          <div className={style.total}>
            <p>Итого</p>
            <p>
              <span className={style.amount}>{totalPrice}</span>
              <span className="currency">&nbsp;₽</span>
            </p>
          </div>

          <button 
            className={style.submit} 
            disabled={orderGoods.length === 0}
            onClick={() => dispatch(openModal())}
            >
              Оформить заказ
          </button>

          <div className={style.apeal}>
            <p className={style.text}>Бесплатная доставка</p>
            <button className={style.close}>Свернуть</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
