// Component Imports
import Register from '@views/auth/Register'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

// export const metadata = {
//   title: 'Register',
//   description: 'Register to your account'
// }

const RegisterPage = async () => {
  const mode = await getServerMode()

  return <Register mode={mode} />
}

export default RegisterPage
