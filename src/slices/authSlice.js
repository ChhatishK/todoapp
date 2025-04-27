import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
};

const getStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? JSON.parse(storedToken) : null;
};

const initialState = {
    token: getStoredToken(),
    loading: false,
    user: getStoredUser()
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem('token', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('token');
            }
        },
        
        setUser: (state, action) => {
            state.user = action.payload;
            if (action.payload) {
                localStorage.setItem('user', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('user');
            }
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },


    }
});

export const { setToken, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;