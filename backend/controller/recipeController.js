import RecipesModel from "../models/recipesModel.js"
import UserModel from "../models/userModel.js"


export const getAllRecipes = async(req, res) => {
  try {
    const response = await RecipesModel.find({})
    res.json(response)
  } 
  catch(err) {
    res.status(404).json({message: err.message})
  }
}


export const newRecipe = async(req, res) => {
  try {
    const recipe = await RecipesModel.create(req.body)
    if(recipe) {
      res.status(201).json(recipe)
    }
  } catch(err) {
    res.status(400).json({message: "Invalid Data", error: err.message});
  }
}


export const saveRecipe = async(req, res) => {
  const { userID, recipeID } = req.body
  try {
    const recipe = await RecipesModel.findById(recipeID)
    const user = await UserModel.findById(userID)
    user.savedRecipes.push(recipe)
    await user.save()
    res.json({ savedRecipes: user.savedRecipes})
  } catch (err) {
    res.json(err.message)
  }
}

export const getSaveRecipeIds = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    res.json({savedRecipes: user?.savedRecipes})
  } catch(err) {
    res.json(err)
  }
}

export const getSaveRecipe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes}
    })
    res.json({savedRecipes})
  } catch(err) {
    res.json(err)
  }
}
