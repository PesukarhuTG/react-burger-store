import style from './Container.module.css';
import classNames from 'classnames';

const Container = ({className}) => {
  return (
    <div className={classNames(style.container, className)}></div>
  )
};

export default Container;