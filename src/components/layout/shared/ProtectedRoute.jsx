'use client'

//React Import
import { useEffect } from 'react'

// Next Import
import { useRouter } from 'next/navigation'

//Redux import
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const { userToken } = useSelector(state => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!userToken && !userToken?.accessToken) {
      router.push('/login')
    }
  }, [userToken?.accessToken])

  return <div>{children}</div>
}

export default ProtectedRoute
