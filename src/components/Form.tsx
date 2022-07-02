import { useAppContext } from '../context';

const Form: React.FC = () => {
  const { handleForm, formInput, ItemValue } = useAppContext();
  return (
    <form onSubmit={handleForm} className='form-container'>
      <input
        onChange={formInput}
        type='text'
        value={ItemValue}
        className='input-control'
        placeholder='Type something...'
        maxLength={25}
      />
    </form>
  );
};

export default Form;
