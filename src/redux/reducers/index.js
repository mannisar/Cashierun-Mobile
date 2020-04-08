import { combineReducers } from 'redux'

import auth from './auth'
import products from './product'
import categorys from './category'
import accounts from './account'
import roles from './role'
import carts from './cart'
import purchases from './purchase'

export default combineReducers({
  auth,
  products,
  categorys,
  accounts,
  roles,
  carts,
  purchases
})
