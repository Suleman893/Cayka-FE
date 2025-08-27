'use client'

//React Imports
import { useEffect } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

//Redux import
import { useSelector } from 'react-redux'

const NonProtectedRoute = ({ children }) => {
  const { userToken } = useSelector(state => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (userToken && userToken?.accessToken) {
      router.push('/dashboard')
    }
  }, [userToken?.accessToken])

  return <div>{children}</div>
}

export default NonProtectedRoute
