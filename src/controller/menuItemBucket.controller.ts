import {NextFunction, Request, Response} from 'express'
import {HTTP_STATUS} from '../constant/httpStatus'
import {SUCCESS_MESSAGE} from '../constant/success'
import {MenuItemModel} from '../model/menuItem.model'
import {MenuItemBucketModel} from '../model/menuItemBucket.model'
import {StoreModel} from '../model/store.model'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const {storeId} = res.locals.bodyParams
  try {
    const store = await StoreModel.findById(storeId)
    const branchId = store.branch.toString()
    const companyId = store.company.toString()

    const menuItems = await MenuItemModel.find({
      $or: [{store: storeId}, {branch: branchId}, {company: companyId}],
    })

    const pageSize = 20
    const numberOfPage = Math.floor(menuItems.length / pageSize) + 1
    const numberOfItemLastPage =
      menuItems.length - pageSize * (numberOfPage - 1)

    const menuItemBuckets = []

    for (let i = 1; i < numberOfPage; ++i) {
      const menuItemIds = menuItems
        .slice(pageSize * (i - 1), pageSize * i)
        .map(x => x._id.toString())
      menuItemBuckets.push({
        page: i,
        count: pageSize,
        store: storeId,
        menuItems: menuItemIds,
      })
    }

    const lastMenuItemIds = menuItems
      .slice(pageSize * (numberOfPage - 1))
      .map(x => x._id.toString())
    menuItemBuckets.push({
      page: numberOfPage,
      count: numberOfItemLastPage,
      store: storeId,
      menuItems: lastMenuItemIds,
    })
    await MenuItemBucketModel.create(menuItemBuckets)

    res.status(HTTP_STATUS.CREATED).json({
      type: 'success',
      message: SUCCESS_MESSAGE.SUCCESS,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}

const getMenuItemBucket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {storeId, page, ingredients} = res.locals.routeQuery
  try {
    const menuItemBucket = await MenuItemBucketModel.findOne({
      store: storeId,
      page,
    }).populate({
      path: 'menuItems',
      populate: ingredients
        ? {
            path: 'ingredients',
          }
        : undefined,
    })

    res.status(HTTP_STATUS.OK).json({
      type: 'success',
      message: SUCCESS_MESSAGE.SUCCESS,
      data: menuItemBucket,
    })
  } catch (error) {
    next(error)
  }
}

export const menuItemBucketController = {
  create,
  getMenuItemBucket,
}
