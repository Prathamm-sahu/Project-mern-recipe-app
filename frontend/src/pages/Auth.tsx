import { FormEvent, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [_, setCookies] = useCookies(["jwt"])
  

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password
      })

      setCookies("jwt", response.data.token, {
        secure: process.env.NODE_ENV !== "development",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
      })
      localStorage.setItem("userID", response.data.userID)
      // window.location.pathname = "/"
      navigate('/')
      toast.success('Login Successfull')
    } catch(err: any) {
      toast.error(err?.response?.data?.message || err.error);
    }
  }

  return (
    <div className="auth-container">
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  </div>
  );
};

const Register = () => {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const onSubmit = async(e: FormEvent) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      toast.error('Password do not match')
    } else {
      try {
        await axios.post("http://localhost:5000/api/users/register", {
          name,
          username,
          email,
          password
        })
        toast.success("Registration Successfull")
      } 
      catch(err: any) {
        toast.error(err?.response?.data?.message || err.error);
      }
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" onChange={(e) => setName(e.target.value)}  />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" name="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
};
