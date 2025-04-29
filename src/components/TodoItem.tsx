import { FiCheck, FiTrash } from 'react-icons/fi';
import { FaUndo } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../store/hooks';
import { removeTodo, toggleTodo } from '../store/todoSlice';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

  const TodoItem = ({ id, text, completed }: TodoItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      className={`todo-item ${completed ? 'completed' : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <span>{text}</span>
      <div className="actions">
        <button
          className="toggle-btn"
          onClick={() => dispatch(toggleTodo(id))}
        >
          {completed ? <FaUndo style={{ fontSize: '18px' }} /> : <FiCheck style={{ fontSize: '25px' }} />}
        </button>
        <button
          className="delete-btn"
          onClick={() => dispatch(removeTodo(id))}
        >
          <FiTrash style={{ fontSize: '20px' }} />
        </button>
      </div>
    </motion.div>
  );
};

export default TodoItem;