import toast from "react-hot-toast";
import { authEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { setLoading, setToken, setUser } from "../../slices/authSlice";

const {
    LOGIN,
    SIGNUP,
    UPDATE_USER
} = authEndpoints

export async function logout(dispatch) {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success("Logout Successful!");
}

export async function login(data, dispatch, navigate) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
        const response = await apiConnector("POST", LOGIN, data);

        console.log("LOGIN_API", response);

        if (!response?.data?.success) {
            // toast.error(response.data.message);
            throw new Error(response?.data?.message);
        }

        const { user } = response.data;
        
        dispatch(setUser(user));
        dispatch(setToken(user.token));
        
        toast.success("Login Successful!");
        
        if (user.accountType === 'Admin') {
            navigate('/admin/view-todos');
        } else {
            navigate('/client/view-todos');
        }

        return true;
    } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response.data.message);
    } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

    return false;
}

export async function signup(data, dispatch, navigate) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
        const response = await apiConnector("POST", SIGNUP, data);

        console.log(response);

        if (!response?.data?.success) {
            toast.error(response.data.message);
            throw new Error(response?.data?.message);
        }

        toast.success('Signup successful!');
        // navigate('/login');

    } catch (error) {
        console.error("Signup error:", error);
        // toast.error(error?.response?.data.message);
    } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export async function updateProfile(data, token, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
        const response = await apiConnector("PUT", UPDATE_USER, data, {
            Authorization: `Bearer ${token}`
        });
 
        if (!response.data.success) {
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }

        dispatch(setUser(response.data.data));
        localStorage.setItem('user', JSON.stringify(response.data.data));   
        toast.success("Profile Updated!");

    } catch (error) {
        console.error("Profile update error:", error);
        // toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}   