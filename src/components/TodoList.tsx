import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import { RootState } from '../store';

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-list">
      <h2>Tasks to do - {activeCount}</h2>
      <div className="active-todos">
        <AnimatePresence>
          {todos
            .filter((todo) => !todo.completed)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
              />
            ))}
        </AnimatePresence>
      </div>
      <h2>Done - {completedCount}</h2>
      <div className="done-todos">
        <AnimatePresence>
          {todos
            .filter((todo) => todo.completed)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoList;