import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, updateTodo, deleteTodo as deleteTodoAPI, deleteTodo } from '../../../services/operations/userAPI';
import { Link } from 'react-router-dom';

function TodoList() {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        totalPages: 1,
        totalTodos: 0,
        hasNextPage: false,
        hasPrevPage: false
    });

    useEffect(() => {
        const loadTodos = async () => {
            try {
                setIsLoading(true);
                setError(null);
                if (token) {
                    if (user.accountType === 'Admin') {
                        const response = await fetchTodos(token, currentPage);
                        setTodos(response.todos);
                        setPagination(response.pagination);
                    } else {
                        // For client, implement client-side pagination
                        const allTodos = user.todos || [];
                        const itemsPerPage = 10;
                        const startIndex = (currentPage - 1) * itemsPerPage;
                        const endIndex = startIndex + itemsPerPage;
                        const paginatedTodos = allTodos.slice(startIndex, endIndex);
                        
                        setTodos(paginatedTodos);
                        setPagination({
                            totalPages: Math.ceil(allTodos.length / itemsPerPage),
                            totalTodos: allTodos.length,
                            hasNextPage: endIndex < allTodos.length,
                            hasPrevPage: startIndex > 0
                        });
                    }
                }
            } catch (error) {
                setError(error.message);
                setTodos([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadTodos();
    }, [token, user, currentPage]);

    const handleMarkAsCompleted = async (todo) => {
        try {
            const data = {
                todoId: todo._id,
                title: todo.title,
                description: todo.description,
                completed: true
            };
            await updateTodo(data, token, dispatch);
        } catch (error) {
            console.error("Error marking todo as completed:", error);
        }
    };

    const handleUpdateTodo = async (todo) => {
        navigate(`/client/todos/${todo._id}`);
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            await deleteTodo(todoId, token, dispatch);
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-white">Loading todos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="w-10/12 mx-auto p-4 mt-10 overflow-x-hidden">
            <h2 className="text-2xl font-bold mb-4">Your Todos</h2>
            <div className="grid gap-4">
                {todos.length === 0 ? (
                    <div className="text-gray-400 text-center py-8">No todos found</div>
                ) : (
                    todos.map((todo) => (
                        <div key={todo._id} className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold">{todo.title}</h3>
                            <p className="text-gray-300">{todo.description}</p>
                            <div className="mt-2 flex justify-between items-center">
                                <span className={`px-2 py-1 rounded text-xs ${
                                    todo.completed ? 'bg-green-500' : 'bg-yellow-500'
                                }`}>
                                    {todo.completed ? 'Completed' : 'Pending'}
                                </span>
                                
                                <div className={`space-x-2 text-xs ${user.accountType === 'Admin' ? 'hidden' : 'flex'}`}>
                                    {!todo.completed && (
                                        <button 
                                            onClick={() => handleMarkAsCompleted(todo)} 
                                            className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                                        >
                                            Mark As Completed
                                        </button>
                                    )}
                                    <Link to={`/client/todos/${todo._id}`}>
                                        <button 
                                            onClick={() => handleUpdateTodo(todo)} 
                                            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                    <button 
                                        onClick={() => handleDeleteTodo(todo._id)} 
                                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                        className={`px-4 py-2 rounded ${
                            pagination.hasPrevPage
                                ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                                : 'bg-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Previous
                    </button>
                    <span className="text-white">
                        Page {currentPage} of {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                        className={`px-4 py-2 rounded ${
                            pagination.hasNextPage
                                ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                                : 'bg-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default TodoList; 