import {NextFunction, Request, Response} from 'express'
import Joi from 'joi'
import {HTTP_STATUS} from '../constant/httpStatus'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const condition = Joi.object({
    name: Joi.string().required().trim().min(2).max(50),
    spotPrice: Joi.number().required().positive(),
    takeawayPrice: Joi.number().required().positive(),
    ingredientIds: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
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

const getMenuItemsByStoreId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const condition = Joi.object({
    storeId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    ingredients: Joi.boolean().required(),
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

export const menuItemValidation = {
  create,
  getMenuItemsByStoreId,
}
