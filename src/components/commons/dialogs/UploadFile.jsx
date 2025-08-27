//React Imports
import { useState } from 'react'

// Third-party Imports
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'

//Mui Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import DialogContent from '@mui/material/DialogContent'

//Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import UploadedFilePreview from '@components/commons/dialogs/UploadedFilePreview'

// Styled Component Imports
import AppReactDropzone from '@libs/styles/AppReactDropzone'

//Redux Imports
import { uploadDevices } from '@redux/devices/thunk'

//Utils Imports
import { isValidFileType } from '@utils/common'

//Constants Imports
import { FILE_MAX_SIZE, FILE_TYPE } from '@constants/common'

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

const UploadFile = ({ setOpen }) => {
  //Redux Imports
  const dispatch = useDispatch()
  const { isUploadDevicesLoading } = useSelector(state => state.device)

  //States
  const [file, setFile] = useState(null)

  // Dropzone hook
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: FILE_TYPE,
    maxSize: FILE_MAX_SIZE, // 20MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      // if (rejectedFiles.length > 0) {
      //   return toast.error('Invalid file! Please upload a CSV, XLS, or XLSX file under 20MB.')
      // }

      // if (acceptedFiles.length === 0) return

      const file = acceptedFiles[0]

      const isValidType = isValidFileType(file)

      if (!isValidType) {
        return toast.error('Invalid file type! Please upload a CSV, XLS, or XLSX file.')
      }

      setFile(file)
    }
  })

  const handleRemove = () => {
    setFile(null)
  }

  const handleSubmit = () => {
    dispatch(uploadDevices({ file, setOpen }))
  }

  return (
    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
      <div className='flex-col gap-14'>
        <Dropzone>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className='flex items-center flex-col gap-3 text-center py-10'>
              <CustomAvatar variant='rounded' skin='light' color='secondary'>
                <i className='tabler-upload' />
              </CustomAvatar>
              <Typography variant='h4'>Drag and drop your file here</Typography>
              <Typography color='text.disabled'>or</Typography>
              <Button variant='tonal' size='small'>
                Browse File
              </Button>
            </div>
          </div>
        </Dropzone>

        {file && <UploadedFilePreview file={file} handleRemove={handleRemove} handleUpload={handleSubmit} />}

        {file && (
          <div className='flex justify-center'>
            <Button
              className='min-w-[32%]'
              variant='contained'
              onClick={handleSubmit}
              disabled={isUploadDevicesLoading}
            >
              {isUploadDevicesLoading ? <CircularProgress color='inherit' size={23} /> : 'Upload File'}
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  )
}

export default UploadFile
