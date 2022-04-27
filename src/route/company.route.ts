import express from 'express'
import {companyController} from '../controller/company.controller'
import {companyValidation} from '../validation/company.validation'

const router = express.Router()

router.post('/', companyValidation.create, companyController.create)

export const companyRoute = router
