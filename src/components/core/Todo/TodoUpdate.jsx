import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTodo } from '../../../services/operations/userAPI';

function TodoUpdate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token, loading } = useSelector((state) => state.auth);
    const { id } = useParams();

    const todo = user.todos.find((todo) => todo._id === id);    
    
    const [formData, setFormData] = useState({
        title: todo.title,
        description: todo.description
    }); 


    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {  
            todoId: id,
            title: formData.title,
            description: formData.description,
        }
        updateTodo(data, token, dispatch);
        navigate('/client/view-todos');
    };

    if (loading) {  
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="w-7/12  mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Update Todo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='flex flex-col gap-2'>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="inputStyle"
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className="">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="inputStyle"
                        rows="4"
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
                >
                    Update Todo
                </button>
            </form>
        </div>
    );
}

export default TodoUpdate; 