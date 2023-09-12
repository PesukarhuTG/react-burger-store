import { Oval } from 'react-loader-spinner';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '100px 0',
};

const Preloader = () => {
  return (
    <div style={style}>
      <Oval
        height={80}
        width={80}
        color='#FFAB08'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='#FFAB08'
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Preloader;