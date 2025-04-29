import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useAppDispatch } from '../store/hooks';
import { addTodo } from '../store/todoSlice';

const TodoForm = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit"><IoMdAdd style={{ fontSize: '25px' }}/></button>
    </form>
  );
};

export default TodoForm;