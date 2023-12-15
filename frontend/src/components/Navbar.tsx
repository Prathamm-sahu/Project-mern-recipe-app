import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(["jwt"])

  const Logout = () => {
    localStorage.removeItem("userID")
    setCookies("jwt", "", {
      expires: new Date(0)
    })
    navigate("/auth")     // Find a way to move directly from http:localhost:3000/save-recipe to http:localhost:3000/auth not to http:localhost:3000/save-recipe/auth
  }

  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"/create-recipe"}>Create Recipe</Link>
      <Link to={"/save-recipe"}>Saved Recipes</Link>
      {!cookies.jwt ? (<Link to={"/auth"}>Login/Register</Link>) : <button onClick={Logout}>Logout</button>}
    </div>
  )
}


// good practice is to check if cookie token is same for a particular user, instead of just checking if the cookie token is present or not


// why option field in setCookie is not working

// If we add httpOnly field in the setCookie function then it does not set the cookie and after removing httpOnly field rest other field are working properly

// I think this must be the same issue with res.cookie() function in node.js in Travery media authentication project
