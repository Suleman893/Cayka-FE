'use client'

// Third-party Imports
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '@redux/store'
import { setAuthInterceptor } from '@utils/axiosSetup'

const ReduxProvider = ({ children }) => {
  setAuthInterceptor(store)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}

export default ReduxProvider
