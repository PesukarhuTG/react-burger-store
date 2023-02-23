import style from './Count.module.css';

const Count = ({count}) => {
  return (
    <div className={style.count}>
        <button className={style.minus}>-</button>
        <p className={style.amount}>{count}</p>
        <button className={style.plus}>+</button>
    </div>
  )
};

export default Count;