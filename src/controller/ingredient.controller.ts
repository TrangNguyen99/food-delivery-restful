import {NextFunction, Request, Response} from 'express'
import {HTTP_STATUS} from '../constant/httpStatus'
import {SUCCESS_MESSAGE} from '../constant/success'
import {IngredientModel} from '../model/ingredient.model'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const {name, price, recipes, levelScope, levelScopeId} = res.locals.bodyParams
  try {
    const ingredient = new IngredientModel({
      name,
      price,
      recipes,
      levelScope,
      [levelScope]: levelScopeId,
    })
    await ingredient.save()

    res.status(HTTP_STATUS.CREATED).json({
      type: 'success',
      message: SUCCESS_MESSAGE.SUCCESS,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}

const getIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {levelScope, levelScopeId} = res.locals.routeQuery
  try {
    const ingredients = await IngredientModel.find({
      levelScope,
      [levelScope]: levelScopeId,
    })

    res.status(HTTP_STATUS.OK).json({
      type: 'success',
      message: SUCCESS_MESSAGE.SUCCESS,
      data: ingredients,
    })
  } catch (error) {
    next(error)
  }
}

export const ingredientController = {
  create,
  getIngredients,
}
