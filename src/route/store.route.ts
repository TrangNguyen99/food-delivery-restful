import express from 'express'
import {storeController} from '../controller/store.controller'
import {storeValidation} from '../validation/store.validation'

const router = express.Router()

router.post('/', storeValidation.create, storeController.create)

export const storeRoute = router
