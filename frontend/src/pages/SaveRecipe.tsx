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

export const SaveRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipes[]>([]);
  const [cookies, _] = useCookies(["jwt"])
  const userID: string | null = useGetUserID();

  useEffect(() => {
    
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `/api/recipes/getSavedRecipes/${userID}`,
          {headers: { authorization: cookies.jwt }}
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err: any) {
        console.error(err?.response?.data?.message || err.error);
      }
    };

    fetchSavedRecipes();
  }, []);

  
  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
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
