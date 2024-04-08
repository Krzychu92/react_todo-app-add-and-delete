/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  filteredTodos: Todo[];
  handleCompleted: (id: number) => void;
  tempTodo: Todo | null;
  deleteTask: (id: number) => void;
  deletingIds: number[];
};

export const TodoList = ({
  filteredTodos,
  handleCompleted,
  tempTodo,
  deleteTask,
  deletingIds,
}: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(task => {
        const { title, completed, id } = task;

        return (
          <div
            key={id}
            data-cy="Todo"
            // eslint-disable-next-line prettier/prettier
            className={classNames('todo', { 'completed': completed})}
          >
            <label
              htmlFor={`Input-task-title#${id}`}
              className="todo__status-label"
            >
              <input
                id={`Input-task-title#${id}`}
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                onChange={() => handleCompleted(id)}
                checked={completed}
              />
            </label>
            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            {/* Remove button appears only on hover */}
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTask(id)}
            >
              ×
            </button>
            {/* overlay will cover the todo while it is being deleted or updated */}
            <div
              data-cy="TodoLoader"
              className={classNames('modal overlay ', {
                'is-active': deletingIds.includes(id),
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}

      {tempTodo && (
        <div>
          <div
            data-cy="Todo"
            className={classNames('todo', {
              completed: tempTodo.completed,
            })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={tempTodo.completed}
              />
            </label>
            <span data-cy="TodoTitle" className="todo__title">
              {tempTodo.title.trim()}
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              x
            </button>

            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </div>
      )}

      {/* This is a completed todo */}
      <div data-cy="Todo" className="todo completed">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Completed Todo
        </span>

        {/* Remove button appears only on hover */}
        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>

        {/* overlay will cover the todo while it is being deleted or updated */}
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>

      {/* This todo is an active todo */}
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Not Completed Todo
        </span>
        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>

        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>

      {/* This todo is being edited */}
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        {/* This form is shown instead of the title and remove button */}
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>

        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </section>
  );
};
