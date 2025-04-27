import toast from "react-hot-toast";
import { todoEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { setLoading, setUser } from "../../slices/authSlice";

const {
    GET_TODOS,
    CREATE_TODO,
    DELETE_TODO,
    UPDATE_TODO
} = todoEndpoints

export async function fetchTodos(token, page = 1) {
    try {
        const response = await apiConnector("GET", `${GET_TODOS}?page=${page}`, null, {
            Authorization: `Bearer ${token}`
        });

        if (!response.data.success) {
            throw new Error(response.data.message || "Failed to fetch todos");
        }

        return response.data.data;

    } catch (error) {
        console.error("Error in fetchTodos:", error.message);
        toast.error(error.message || "Failed to fetch todos");
    }
}

export async function createTodo(data, token, dispatch, navigate) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {

        const response = await apiConnector("POST", CREATE_TODO, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        dispatch(setUser(response?.data?.data));

        localStorage.setItem('user', JSON.stringify(response?.data?.data));

        toast.success("Todo Created!");
        navigate("/client/view-todos");

    } catch (error) {
        console.log(error);
        toast.error("Todo Not Created!")
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
}

export async function updateTodo(data, token, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {

        const response = await apiConnector("POST", UPDATE_TODO, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        dispatch(setUser(response?.data?.data));

        localStorage.setItem('user', JSON.stringify(response?.data?.data));

        toast.success("Todo Created!");

    } catch (error) {
        console.log(error);
        toast.error("Todo Not Created!")
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
}

export async function deleteTodo(todoId, token, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {

        const response = await apiConnector("DELETE", DELETE_TODO, {todoId: todoId}, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(response);

        dispatch(setUser(response?.data?.data));
        localStorage.setItem('user', JSON.stringify(response?.data?.data));

        toast.success("Todo Deleted!");

    } catch (error) {
        console.log(error);
        toast.error("Todo Not Deleted!");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
}
