import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ taskName: '', description: '', status: 'not completed' });
    const [filter, setFilter] = useState('all');

    const handleChange = (e) => {
        setNewTodo({
            ...newTodo, [e.target.name]: e.target.value
        });
    };

    const handleCreateTodo = () => {
        setTodos([...todos, newTodo]);
        setNewTodo({ taskName: '', description: '', status: 'not completed' });
    };

    const handleUpdateTodoStatus = (index) => {
        const updatedTodos = todos.map((todo, i) => {
            if (i === index) {
                return { ...todo, status: todo.status === 'completed' ? 'not completed' : 'completed' };
            }
            return todo;
        });

        setTodos(updatedTodos);
    };

    const handleDeleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') {
            return true;
        }
        return todo.status === filter;
    });

    return (
        <div className='container-fluid p-0' style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <div className='row justify-content-center m-0' style={{ width: '100%' }}>
                <div className='col-lg-8 col-md-10 col-sm-12' style={{marginTop:'12%'}}>
                    <h2 className='text-center mb-4' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#333' }}>Todo List</h2>
                    <div className='mb-3'>
                        <input
                            type="text"
                            className='form-control'
                            name="taskName"
                            placeholder='Task name'
                            value={newTodo.taskName}
                            onChange={handleChange}
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ced4da' }}
                        />
                    </div>
                    <div className='mb-3'>
                        <textarea
                            className='form-control'
                            name="description"
                            placeholder='Description'
                            value={newTodo.description}
                            onChange={handleChange}
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ced4da' }}
                        />
                    </div>
                    <button className='btn btn-primary mb-3' onClick={handleCreateTodo} style={{ width: '100%', padding: '10px', fontSize: '16px' }}>Add Todo</button>
                    <div className='mb-3'>
                        <select className='form-select' onChange={(e) => setFilter(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ced4da' }}>
                            <option value="all">All</option>
                            <option value="not completed">Not Completed</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className='row justify-content-center'>
                        {filteredTodos.map((todo, index) => (
                            <div key={index} className='col-lg-6 col-md-8 col-sm-10 col-12 mb-3'>
                                <div className='card shadow-sm' style={{ borderRadius: '8px' }}>
                                    <div className='card-body'>
                                        <h5 className='card-title' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#007bff' }}>{todo.taskName}</h5>
                                        <p className='card-text' style={{ fontFamily: 'Arial, sans-serif', color: '#555' }}>{todo.description}</p>
                                        <p className='card-text' style={{ fontFamily: 'Arial, sans-serif', color: '#555' }}>Status: <span style={{ fontWeight: 'bold', color: todo.status === 'completed' ? 'green' : 'red' }}>{todo.status}</span></p>
                                        <button
                                            className='btn btn-secondary me-2'
                                            onClick={() => handleUpdateTodoStatus(index)}
                                            style={{ borderRadius: '4px' }}
                                        >
                                            {todo.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
                                        </button>
                                        <button className='btn btn-danger' onClick={() => handleDeleteTodo(index)} style={{ borderRadius: '4px' }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoApp;
