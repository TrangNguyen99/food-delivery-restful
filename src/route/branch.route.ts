import express from 'express'
import {branchController} from '../controller/branch.controller'
import {branchValidation} from '../validation/branch.validation'

const router = express.Router()

router.post('/', branchValidation.create, branchController.create)

export const branchRoute = router
