import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import TodoForm from './components/core/Todo/TodoForm'
import LoginForm from "./components/core/auth/LoginForm"
import SignupForm from "./components/core/auth/SignupForm"
import ClientProtected from "./components/core/auth/ClientProtected"
import AdminProtected from "./components/core/auth/AdminProtected"
import TodoList from "./components/core/Todo/TodoList"
import ProfileUpdate from "./components/core/Profile/ProfileUpdate"
import TodoUpdate from "./components/core/Todo/TodoUpdate"
import { useSelector } from "react-redux"

function App() { 
  const {token, user} = useSelector((state) => state.auth);

  return (
    <div className="max-w-screen min-h-screen bg-black flex flex-col text-white overflow-x-hidden">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Route>

        {/* Client Protected Routes */}
        <Route path="/client/view-todos" element={<ClientProtected><TodoList /></ClientProtected>} />
        <Route path="/client/create-todo" element={<ClientProtected><TodoForm /></ClientProtected>} />
        <Route path="/client/todos/:id" element={<ClientProtected><TodoUpdate /></ClientProtected>} />
        <Route path="/client/update-profile" element={<ClientProtected><ProfileUpdate /></ClientProtected>} />

        {/* Admin Protected Routes */}
        <Route path="/admin/view-todos" element={<AdminProtected><TodoList /></AdminProtected>} />
        <Route path="/admin/update-profile" element={<AdminProtected><ProfileUpdate /></AdminProtected>} />
      </Routes>
    </div>
  )
}

export default App
