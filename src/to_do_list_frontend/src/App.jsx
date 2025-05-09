import React, { useState, useEffect } from 'react';
import { to_do_list_backend } from 'declarations/to_do_list_backend';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const result = await to_do_list_backend.getTasks();
    setTasks(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await to_do_list_backend.addTask(input);
    setInput('');
    fetchTasks();
  };

  const deleteTask = async (index) => {
    await to_do_list_backend.removeTask(index);
    fetchTasks();
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>📝 To-Do List on ICP</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your task..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add</button>
      </form>
      <ul style={styles.list}>
        {tasks.map((task, index) => (
          <li key={index} style={styles.listItem}>
            <span>{task}</span>
            <button onClick={() => deleteTask(index)} style={styles.deleteButton}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    background: 'linear-gradient(to right, #90EE90, #4D8A6A)',
    borderRadius: '1rem',
    color: '#fff',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    marginTop: '4rem'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '2rem',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#fff',
    color: '#4D8A6A',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.25rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: '#ffffff33',
    color: '#fff',
    padding: '0.75rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
};

export default App;
