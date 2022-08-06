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
    // addDoc,
    // deleteDoc
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

  // Create Todo
  // Read TODO

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

  // Update Todo
    const toggleComplete = async (todo) => {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed,
      });
    };

  // Delete Todo

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>TODO APP</h3>
        <form className={style.form}>
          <input
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
              // deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        <p className={style.count}>You Have 2 Todos</p>
      </div>
    </div>
  );
}

export default App;