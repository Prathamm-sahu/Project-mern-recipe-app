import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import { Home } from "./pages/Home"
import { Auth } from "./pages/Auth"
import { CreateRecipe } from "./pages/CreateRecipe"
import { SaveRecipe } from "./pages/SaveRecipe"
import { Navbar } from "./components/Navbar"
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/save-recipe" element={<SaveRecipe />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
