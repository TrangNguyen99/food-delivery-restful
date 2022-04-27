import express from 'express'
import {countryController} from '../controller/country.controller'
import {countryValidation} from '../validation/country.validation'

const router = express.Router()

router.post('/', countryValidation.create, countryController.create)

export const countryRoute = router
