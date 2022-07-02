import { useAppContext } from '../context';

const Alert: React.FC = () => {
  const {
    showAlert,
    alertMessege: { type, messege },
  } = useAppContext();

  return (
    <div className='alert-container'>
      {showAlert && (
        <div className={`alert-box ${type}`}>
          <p>{messege}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
