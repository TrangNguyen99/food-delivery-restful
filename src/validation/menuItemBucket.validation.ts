import {NextFunction, Request, Response} from 'express'
import Joi from 'joi'
import {HTTP_STATUS} from '../constant/httpStatus'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const condition = Joi.object({
    storeId: Joi.string()
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

const getMenuItemBucket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const condition = Joi.object({
    storeId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    page: Joi.number().required().integer().positive(),
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

export const menuItemBucketValidation = {
  create,
  getMenuItemBucket,
}
