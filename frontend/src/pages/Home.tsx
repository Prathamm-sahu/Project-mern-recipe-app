import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

type Recipes = {
  _id: string;
  name: string;
  instructions: string;
  imageUrl: string;
  cookingTime: number;
};

export const Home = () => {
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [cookies, _] = useCookies(["jwt"])
  const userID: string | null = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("/api/recipes/allRecipes", { headers: { authorization: cookies.jwt }});
        setRecipes(response.data);
      } catch (err: any) {
        console.error(err?.response?.data?.message || err.error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `/api/recipes/getSavedRecipes/ids/${userID}`,
          {headers: { authorization: cookies.jwt }}
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err: any) {
        console.error(err?.response?.data?.message || err.error);
      }
    };

    fetchRecipe();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID: string) => {
    try {
      const response = await axios.put("/api/recipes/save", {
        recipeID,
        userID,
      }, {headers: { authorization: cookies.jwt }}
      );
      setSavedRecipes(response.data.savedRecipes)
    } catch (err: any) {
      console.error(err?.response?.data?.message || err.error);
    }
  };

  const isRecipeSaved = (id: string) => savedRecipes.includes(id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {savedRecipes.includes(recipe._id) && <h4>Already Saved</h4>}
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>

            <img src={recipe.imageUrl} alt="recipeImg" />
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
