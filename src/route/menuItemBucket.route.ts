import express from 'express'
import {menuItemBucketController} from '../controller/menuItemBucket.controller'
import {menuItemBucketValidation} from '../validation/menuItemBucket.validation'

const router = express.Router()

router.post(
  '/',
  menuItemBucketValidation.create,
  menuItemBucketController.create,
)
router.get(
  '/',
  menuItemBucketValidation.getMenuItemBucket,
  menuItemBucketController.getMenuItemBucket,
)

export const menuItemBucketRoute = router
