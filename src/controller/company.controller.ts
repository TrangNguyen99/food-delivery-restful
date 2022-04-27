import {NextFunction, Request, Response} from 'express'
import {HTTP_STATUS} from '../constant/httpStatus'
import {SUCCESS_MESSAGE} from '../constant/success'
import {CompanyModel} from '../model/company.model'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const {name} = res.locals.bodyParams
  try {
    const company = new CompanyModel({name})
    await company.save()

    res.status(HTTP_STATUS.CREATED).json({
      type: 'success',
      message: SUCCESS_MESSAGE.SUCCESS,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}

export const companyController = {
  create,
}
