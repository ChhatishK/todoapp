const BASE_URL = 'https://todoapp-a16a.onrender.com/api'
console.log(BASE_URL);

// AUTH ENDPOINTS
export const authEndpoints = {
    SIGNUP: BASE_URL + '/user/signup',
    LOGIN: BASE_URL + '/user/login',
    UPDATE_USER: BASE_URL+'/user/update-user'
}

// TODO ENDPOINTS
export const todoEndpoints = {
    CREATE_TODO: BASE_URL + '/todo/create-todo',
    UPDATE_TODO: BASE_URL + '/todo/update-todo',
    DELETE_TODO: BASE_URL + '/todo/delete-todo',
    GET_TODOS: BASE_URL + '/todo/view-todos'
}