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
  deleteDoc,
} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#1D96A1] to-[#12EBCE]`,
  container: `bg-zinc-800 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-4xl mb-3 font-bold text-center text-gray-100 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl bg-stone-500 placeholder-white text-gray-200`,
  button: `border p-4 ml-2 bg-slate-200`,
  count: `text-center p-2 text-xl text-gray-100 font-bold`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // =============== Create TODO =============== //
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  // =============== Read TODO =============== //
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

  // =============== Update TODO =============== //
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // =============== Delete TODO =============== //
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h2 className={style.heading}>TODO APP</h2>
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
          <p className={style.count}>{`You have ${todos.length} Todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;