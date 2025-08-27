// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'
import NonProtectedRoute from '@components/layout/shared/NonProtectedRoute'

const Layout = async props => {
  const { children } = props

  // Vars
  const direction = 'ltr'
  const systemMode = await getSystemMode()

  return (
    <Providers direction={direction}>
      <NonProtectedRoute>
        <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
      </NonProtectedRoute>
    </Providers>
  )
}

export default Layout
