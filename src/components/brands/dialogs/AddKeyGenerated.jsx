// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

//Third party imports
import { toast } from 'react-toastify'
import { customAlphabet } from 'nanoid'

// Component Imports
import Clipboard from '@assets/svg/Clipboard'

//Constants Imports
import { LICENSE_KEY } from '@constants/common'

const AddKeyGenerated = ({ setValue, setSessionStoredKey, sessionStoredKey }) => {
  //States
  const [licenseKey, setLicenseKey] = useState('')

  //Generate License Key
  const generateLicenseKey = useCallback(() => {
    const nanoid = customAlphabet(LICENSE_KEY, 5)

    return Array.from({ length: 5 }, () => nanoid()).join('-')
  }, [])

  useEffect(() => {
    let newLicenseKey = sessionStoredKey || generateLicenseKey()

    setSessionStoredKey(newLicenseKey)
    setLicenseKey(newLicenseKey)
    setValue('licenseKey', newLicenseKey)
  }, [])

  //Copy License Key
  const copyText = () => {
    try {
      navigator.clipboard.writeText(licenseKey)
      toast.success('License key copied')
    } catch (err) {
      toast.error('Failed to copy key', err)
    }
  }

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex flex-col gap-4s w-[95%]'>
        <Typography variant='body1'>License Key</Typography>
        <div className='px-4 py-2 bg-white border border-gray rounded-md'>{licenseKey}</div>
      </div>
      <div className='self-end'>
        <Tooltip title='Copy Key' placement='right-start' arrow>
          <span>
            <Clipboard clickHandler={copyText} />
          </span>
        </Tooltip>
      </div>
    </div>
  )
}

export default AddKeyGenerated
