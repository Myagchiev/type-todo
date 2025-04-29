import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { loadTodos } from '../store/todoSlice';

const TodoList = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem('todos') || '[]');
    if (
      Array.isArray(todosFromStorage) &&
      todosFromStorage.every(
        (todo) =>
          typeof todo.id === 'string' &&
          typeof todo.text === 'string' &&
          typeof todo.completed === 'boolean'
      )
    ) {
      dispatch(loadTodos(todosFromStorage));
    } else {
      dispatch(loadTodos([]));
    }
  }, [dispatch]);

  useEffect(() => {
    const serializedTodos = JSON.stringify(todos);
    if (localStorage.getItem('todos') !== serializedTodos) {
      localStorage.setItem('todos', serializedTodos);
    }
  }, [todos]);

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