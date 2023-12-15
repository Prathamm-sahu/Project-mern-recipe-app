import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "react-toastify";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
  cookingTime: number;
  userOwner: number;
}


export const CreateRecipe = () => {

  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: 0,
  })

  const [cookies, _] = useCookies(["jwt"])
  const userID = useGetUserID()
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target
    setRecipe({ ...recipe, [name]: value })
  }

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>, idx: number) => {
    const {value} = event.target
    const ingredients = recipe.ingredients
    ingredients[idx] = value
    setRecipe({...recipe, ingredients})
  }

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""]})
  }

  const onSubmit = async(e: FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/api/recipes/newRecipe', {...recipe, userOwner: userID }, {headers: { authorization: cookies.jwt }})
      navigate('/')
      toast.success("Recipe Added")
    } catch(err: any) {
      toast.error(err?.response?.data?.message || err.error)
    }
  }

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} />

        <label htmlFor="ingredients">Ingreditents</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input key={idx} type="text" name="ingredients" value={ingredient} onChange={(event: ChangeEvent<HTMLInputElement>) => handleIngredientChange(event, idx)} />
        ))}
        <button type="button" onClick={addIngredient}>Add Ingredients</button>

        <label htmlFor="instructions">Instructions</label>
        <textarea name="instructions" id="" cols={30} rows={10} onChange={handleChange}></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" name="imageUrl" onChange={handleChange} />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input type="number" name="cookingTime" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
