// Component Imports
import ForgotPassword from '@views/auth/ForgotPassword'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

// export const metadata = {
//   title: 'Forgot Password',
//   description: 'Forgotten Password to your account'
// }

const ForgotPasswordPage = async () => {
  const mode = await getServerMode()

  return <ForgotPassword mode={mode} />
}

export default ForgotPasswordPage
