import {NextFunction, Request, Response} from 'express'
import {ERROR_MESSAGE} from '../constant/error'
import {HTTP_STATUS} from '../constant/httpStatus'
import {SUCCESS_MESSAGE} from '../constant/success'
import {MenuItemModel} from '../model/menuItem.model'
import {StoreModel} from '../model/store.model'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    spotPrice,
    takeawayPrice,
    ingredientIds,
    levelScope,
    levelScopeId,
  } = res.locals.bodyParams
  try {
    const menuItem = new MenuItemModel({
      name,
      spotPrice,
      takeawayPrice,
      ingredients: ingredientIds,
      levelScope,
      [levelScope]: levelScopeId,
    })
    await menuItem.save()

    res.status(HTTP_STATUS.CREATED).json({
      type: 'success',
      message: SUCCESS_MESSAGE.SUCCESS,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}

const getMenuItemsByStoreId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {storeId, ingredients} = res.locals.routeQuery
  try {
    const store = await StoreModel.findById(storeId)
    if (!store) {
      next({
        status: HTTP_STATUS.BAD_REQUEST,
        message: ERROR_MESSAGE.BAD_REQUEST,
      })
      return
    }

    const branchId = store.branch.toString()
    const companyId = store.company.toString()

    let menuItems
    if (ingredients) {
      menuItems = await MenuItemModel.find({
        $or: [{store: storeId}, {branch: branchId}, {company: companyId}],
      }).populate('ingredients')
    } else {
      menuItems = await MenuItemModel.find({
        $or: [{store: storeId}, {branch: branchId}, {company: companyId}],
      })
    }

    res.status(HTTP_STATUS.OK).json({
      type: 'success',
      message: SUCCESS_MESSAGE.SUCCESS,
      data: menuItems,
    })
  } catch (error) {
    next(error)
  }
}

export const menuItemController = {
  create,
  getMenuItemsByStoreId,
}
