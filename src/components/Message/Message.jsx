import style from './Message.module.css';

const Message = ({text}) => {
  return (
    <p className={style.message}>{text}</p>
  )
};

export default Message;