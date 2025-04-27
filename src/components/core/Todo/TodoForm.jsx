import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '../../../services/operations/userAPI';

function TodoForm() {

    const {token} = useSelector((state) => state.auth);

    const [todoData, setTodoData] = useState({
            title: "",
            description: ""
        })
        const dispatch = useDispatch();
        const navigate = useNavigate();
    
        function handleChange(e) {
    
            const {name, value} = e.target;
    
            setTodoData((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    
        const {title, description} = todoData;

        function handleSubmit(e) {
            e.preventDefault();

            if (!title) {
                toast.error("Title is required!");
                return;
            }

            createTodo(todoData, token, dispatch, navigate);

            setTodoData({title: "", description: ""});
        }

  return (
    <div className='w-7/12  mx-auto flex flex-col justify-center mt-10'>
        <h1 className='heading'>Create New Todo Task</h1>
        <form action="" className='formStyle' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
                <label htmlFor="title">Title*</label>
                <input 
                    type="text"
                    placeholder='Enter title....'
                    name='title'
                    value={title}
                    onChange={handleChange}
                    className='inputStyle'
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="title">Title*</label>
                <textarea 
                    type="text"
                    placeholder='Enter title....'
                    name='description'
                    value={description}
                    onChange={handleChange}
                    className='inputStyle'
                />
            </div>

            <button type='Submit' className='btn'>
                Add
            </button>
        </form>
    </div>
  )
}

export default TodoForm