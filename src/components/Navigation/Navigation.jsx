import Container from '../Container/Container.jsx';
import style from './Navigation.module.css';
import classNames from 'classnames';

const Navigation = () => {
  return (
    <nav className={style.navigation}>
      <Container className={style.navigation__container}>
        <ul className={style.navigation__list}>
          <li className={style.navigation__item}>
            <button className={classNames(style.navigation__button, style.navigation__button_burger, style.navigation__button_active)}>Бургеры</button>
          </li>
          <li className={style.navigation__item}>
            <button className={classNames(style.navigation__button, style.navigation__button_snack)}>Закуски</button>
          </li>
          <li className={style.navigation__item}>
            <button className={classNames(style.navigation__button, style.navigation__button_hotdog)}>Хот-доги</button>
          </li>
          <li className={style.navigation__item}>
            <button className={classNames(style.navigation__button, style.navigation__button_combo)}>Комбо</button>
          </li>
          <li className={style.navigation__item}>
            <button className={classNames(style.navigation__button, style.navigation__button_shawarma)}>Шаурма</button>
          </li>
          <li className={style.navigation__item}>
            <button className={classNames(style.navigation__button, style.navigation__button_pizza)}>Пицца</button>
          </li>
          <li className={style.navigation__item}>
            <button className={classNames(style.navigation__button, style.navigation__button_wok)}>Вок</button>
          </li>
          <li className={style.navigation__item}>
            <button className={classNames(style.navigation__button, style.navigation__button_dessert)}>Десерты</button>
          </li>
          <li className={style.navigation__item}>
            <button className={classNames(style.navigation__button, style.navigation__button_sauce)}>Соусы</button>
          </li>
        </ul>
      </Container>
    </nav>
  )
};

export default Navigation;