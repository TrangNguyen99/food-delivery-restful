import express from 'express'
import {branchRoute} from './branch.route'
import {cityRoute} from './city.route'
import {companyRoute} from './company.route'
import {countryRoute} from './country.route'
import {ingredientRoute} from './ingredient.route'
import {menuItemRoute} from './menuItem.route'
import {menuItemBucketRoute} from './menuItemBucket.route'
import {storeRoute} from './store.route'

const router = express.Router()

router.use('/countries', countryRoute)
router.use('/cities', cityRoute)

router.use('/companies', companyRoute)
router.use('/branches', branchRoute)
router.use('/stores', storeRoute)

router.use('/ingredients', ingredientRoute)
router.use('/menu-items', menuItemRoute)

router.use('/menu-item-buckets', menuItemBucketRoute)

export const api = router
