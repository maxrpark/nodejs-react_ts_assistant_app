import TodoItem from "../components/TodoItem";
import { Item } from "../ts/interfaces";
import { useAppContext } from "../context";
import Form from "../components/Form";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const Todo = () => {
  const { todo, removeAll, isLoading, isError } = useAppContext();

  return (
    <div className='section-center section'>
      <h2 className='title'>Node.js Server - React TS assistant app</h2>
      <Alert />
      <section className='main-container'>
        <h2>Task List</h2>
        <Form />
        <div className='todo-list'>
          <ul className='todo-container'>
            {isLoading && (
              <h3>
                {" "}
                {isError
                  ? "Sorry there was an error"
                  : "Fetching data from heroku"}
              </h3>
            )}
            {todo.length > 0 &&
              !isLoading &&
              todo.map((item: Item) => {
                return <TodoItem key={item._id} item={item} />;
              })}
          </ul>
        </div>
        {todo.length > 0 && (
          <button className='remove-items' onClick={removeAll}>
            remove all
          </button>
        )}
      </section>
    </div>
  );
};

export default Todo;
