import {NextFunction, Request, Response} from 'express'
import {ERROR_MESSAGE} from '../constant/error'
import {HTTP_STATUS} from '../constant/httpStatus'
import {SUCCESS_MESSAGE} from '../constant/success'
import {CityModel} from '../model/city.model'
import {CountryModel} from '../model/country.model'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const {name, countryId} = res.locals.bodyParams
  try {
    const country = await CountryModel.findById(countryId)
    if (!country) {
      next({
        status: HTTP_STATUS.BAD_REQUEST,
        message: ERROR_MESSAGE.BAD_REQUEST,
      })
      return
    }

    const city = new CityModel({name, country: countryId})
    await city.save()

    res.status(HTTP_STATUS.CREATED).json({
      type: 'success',
      message: SUCCESS_MESSAGE.SUCCESS,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}

export const cityController = {
  create,
}
