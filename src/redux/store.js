import AsyncStorage from '@react-native-community/async-storage'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { persistStore, persistReducer } from 'redux-persist'

import reducers from './reducers'

const logger = createLogger({})

const persisConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['auth']
}

const pReducer = persistReducer(persisConfig, reducers)

const store = createStore(
  pReducer,
  compose(
    applyMiddleware(
      logger,
      promiseMiddleware
    )
  )
)

const persistor = persistStore(store)

export {
  store,
  persistor
}
