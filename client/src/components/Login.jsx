import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'  // ← MISSING IMPORT
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'  // ← ADD IF MISSING

const Login = () => {
  const { setShowLogin, axios, setToken } = useAppContext()
  const navigate = useNavigate()  // ← MISSING HOOK
  const [state, setState] = useState("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitHandler = async (e) => {  // ← async here
    e.preventDefault()
    try {
      const { data } = await axios.post(`/api/user/${state}`, { 
        ...(state === "register" && { name }),  // ← Only send name for register
        email, 
        password 
      })
      
      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
        navigate('/')  // ← Fixed: use navigate hook
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")  // ← Fixed error handling
    }
  }

  // Rest of JSX remains same...
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setshowLogin(false)}>
      <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm p-8 rounded-lg bg-white shadow-xl flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center">
          User {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {state === "register" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <p className="text-sm text-center">
          {state === "login" ? "Create an account? " : "Already have an account? "}
          <span
            className="text-blue-600 cursor-pointer font-medium"
            onClick={() => setState(state === "login" ? "register" : "login")}
          >
            Click here
          </span>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  )
}

export default Login


