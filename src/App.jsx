import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Components/Todo';
import { db } from './Components/Firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#1D96A1] to-[#12EBCE]`,
  container: `bg-slate-800 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-100 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl bg-slate-400 placeholder-white text-gray-900`,
  button: `border p-4 ml-2 bg-slate-200`,
  count: `text-center p-2 text-gray-100 font-bold`,
};


function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // ============== Create Todo ============== //
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please Enter a Valid TODO!');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  // ============== Read TODO ============== //
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // ============== Update Todo ============== //
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // ============== Delete Todo ============== //
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todo', id))
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>TODO APP</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Todo'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;