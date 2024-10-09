import { FormEvent, useState } from 'react';
import { useTodos } from '../store/todos';

const AddToDo = () => {
  const [data, setData] = useState('');
  const { handleAddToDo } = useTodos();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddToDo(data);
    setData('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      <button>Submit</button>
    </form>
  );
};

export default AddToDo;
