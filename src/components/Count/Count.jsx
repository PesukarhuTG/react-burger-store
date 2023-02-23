import { useEffect, useState } from 'react';
import style from './Count.module.css';

const Count = () => {
  const [count, setCount] = useState(1);

  const changeCount = (e) => (e.target.innerHTML === '+') ? setCount(count + 1) : setCount(count - 1);

  return (
    <div className={style.count}>
        <button className={style.minus} onClick={changeCount} disabled={count === 1}>-</button>
        <p className={style.amount}>{count}</p>
        <button className={style.plus} onClick={changeCount}>+</button>
    </div>
  )
};

export default Count;