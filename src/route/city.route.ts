import express from 'express'
import {cityController} from '../controller/city.controller'
import {cityValidation} from '../validation/city.validation'

const router = express.Router()

router.post('/', cityValidation.create, cityController.create)

export const cityRoute = router
