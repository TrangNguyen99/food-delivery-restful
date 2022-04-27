import {NextFunction, Request, Response} from 'express'
import {ERROR_MESSAGE} from '../constant/error'
import {HTTP_STATUS} from '../constant/httpStatus'
import {SUCCESS_MESSAGE} from '../constant/success'
import {BranchModel} from '../model/branch.model'
import {StoreModel} from '../model/store.model'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const {name, branchId} = res.locals.bodyParams
  try {
    const branch = await BranchModel.findById(branchId)
    if (!branch) {
      next({
        status: HTTP_STATUS.BAD_REQUEST,
        message: ERROR_MESSAGE.BAD_REQUEST,
      })
      return
    }

    const store = new StoreModel({
      name,
      branch: branchId,
      company: branch.company.toString(),
    })
    await store.save()

    res.status(HTTP_STATUS.CREATED).json({
      type: 'success',
      message: SUCCESS_MESSAGE.SUCCESS,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}

export const storeController = {
  create,
}
