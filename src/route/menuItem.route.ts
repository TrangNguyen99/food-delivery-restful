import express from 'express'
import {menuItemController} from '../controller/menuItem.controller'
import {menuItemValidation} from '../validation/menuItem.validation'

const router = express.Router()

router.post('/', menuItemValidation.create, menuItemController.create)
router.get(
  '/',
  menuItemValidation.getMenuItemsByStoreId,
  menuItemController.getMenuItemsByStoreId,
)

export const menuItemRoute = router
