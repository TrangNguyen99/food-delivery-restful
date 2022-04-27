import {NextFunction, Request, Response} from 'express'
import {ERROR_MESSAGE} from '../constant/error'
import {HTTP_STATUS} from '../constant/httpStatus'
import {SUCCESS_MESSAGE} from '../constant/success'
import {BranchModel} from '../model/branch.model'
import {CompanyModel} from '../model/company.model'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const {name, companyId} = res.locals.bodyParams
  try {
    const company = CompanyModel.findById(companyId)
    if (!company) {
      next({
        status: HTTP_STATUS.BAD_REQUEST,
        message: ERROR_MESSAGE.BAD_REQUEST,
      })
      return
    }

    const branch = new BranchModel({name, company: companyId})
    await branch.save()

    res.status(HTTP_STATUS.CREATED).json({
      type: 'success',
      message: SUCCESS_MESSAGE.SUCCESS,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}

export const branchController = {
  create,
}
