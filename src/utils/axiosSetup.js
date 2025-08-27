import axios from 'axios'

import { envConfig } from '@configs/envConfig'

import { renewAccessToken } from '@redux/auth/thunk'
import { logout } from '@redux/auth/slice'

let baseURL = envConfig.API_URL

//For auth pages/unauthorized API's without token in headers
export const PublicAPI = axios.create({
  baseURL: `${baseURL}`
})

//For protected API's, with token in headers
export const ProtectedAPI = axios.create({
  baseURL: `${baseURL}`
})

export const setAuthInterceptor = store => {
  ProtectedAPI.interceptors.request.use(
    req => {
      const userToken = store.getState().auth.userToken

      if (userToken?.accessToken) {
        req.headers['Authorization'] = `Bearer ${userToken?.accessToken}`
      }

      return req
    },
    err => {
      return Promise.reject(err)
    }
  )

  ProtectedAPI.interceptors.response.use(
    res => {
      return res
    },
    async err => {
      const originalReq = err.config

      // If unauthorized (401) and request hasn't been retried
      if (err.response.status === 401 && !originalReq._retry) {
        originalReq._retry = true

        try {
          const refreshToken = store.getState()?.auth?.userToken?.refreshToken

          if (!refreshToken) {
            store.dispatch(logout())

            return Promise.reject(err)
          }

          // Renew the access token
          // await store.dispatch(renewAccessToken({ refreshToken }))

          const resultAction = await store.dispatch(renewAccessToken({ refreshToken }))

          // // If refreshing fails, logout the user
          if (resultAction.meta.requestStatus === 'fulfilled') {
            const newAccessToken = resultAction.payload.accessToken

            originalReq.headers['Authorization'] = `Bearer ${newAccessToken}`

            // return axios(originalReq)
            return ProtectedAPI.request(originalReq)
          } else {
            store.dispatch(logout())

            return Promise.reject(err)
          }
        } catch (err) {
          store.dispatch(logout())

          return Promise.reject(err)
        }
      }

      return Promise.reject(err)
    }
  )
}
