import express from 'express'
import {ingredientController} from '../controller/ingredient.controller'
import {ingredientValidation} from '../validation/ingredient.validation'

const router = express.Router()

router.post('/', ingredientValidation.create, ingredientController.create)
router.get(
  '/',
  ingredientValidation.getIngredients,
  ingredientController.getIngredients,
)

export const ingredientRoute = router
