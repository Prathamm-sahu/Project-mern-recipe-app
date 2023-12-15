import express from "express"
import { getAllRecipes, newRecipe, saveRecipe, getSaveRecipeIds, getSaveRecipe } from "../controller/recipeController.js"
import { verifyToken } from "../middleware/authMiddleware.js"


const router = express.Router()

router.get('/allRecipes', getAllRecipes)

router.post('/newRecipe', verifyToken, newRecipe)

router.put('/save', verifyToken, saveRecipe)

router.get('/getSavedRecipes/ids/:userID', verifyToken, getSaveRecipeIds)

router.get('/getSavedRecipes/:userID', verifyToken, getSaveRecipe)

export { router as recipeRouter}

