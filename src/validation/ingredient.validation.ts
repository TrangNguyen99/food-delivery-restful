import {NextFunction, Request, Response} from 'express'
import Joi from 'joi'
import {HTTP_STATUS} from '../constant/httpStatus'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const condition = Joi.object({
    name: Joi.string().required().trim().min(2).max(20),
    price: Joi.number().required().min(0),
    recipes: Joi.array().items(
      Joi.object({
        name: Joi.string().required().trim().min(2).max(20),
      }),
    ),
    levelScope: Joi.string().required().valid('store', 'branch', 'company'),
    levelScopeId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
  })

  try {
    const bodyParams = await condition.validateAsync(req.body, {
      abortEarly: false,
    })
    res.locals.bodyParams = bodyParams
    next()
  } catch (error: any) {
    next({
      status: HTTP_STATUS.BAD_REQUEST,
      message: error.message,
    })
  }
}

const getIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const condition = Joi.object({
    levelScope: Joi.string().required().valid('store', 'branch', 'company'),
    levelScopeId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
  })

  try {
    const routeQuery = await condition.validateAsync(req.query, {
      abortEarly: false,
    })
    res.locals.routeQuery = routeQuery
    next()
  } catch (error: any) {
    next({
      status: HTTP_STATUS.BAD_REQUEST,
      message: error.message,
    })
  }
}

export const ingredientValidation = {
  create,
  getIngredients,
}
