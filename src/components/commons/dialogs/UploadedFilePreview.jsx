//MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

const UploadedFilePreview = ({ file, handleRemove }) => {
  return (
    <>
      <List>
        <ListItem key={file.name} className='pis-4 plb-3 border border-gray-300 rounded-[5px]'>
          <div className='flex gap-2 items-center file-details w-full'>
            <div className='file-preview'>
              <i className='tabler-file-description' />
            </div>
            <div>
              <Typography className='file-name font-medium' color='text.primary'>
                {file.name}
              </Typography>
              <Typography className='file-size' variant='body2'>
                {Math.round(file.size / 100) / 10 > 1000
                  ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                  : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
              </Typography>
            </div>
          </div>
          <IconButton onClick={handleRemove}>
            <i className='tabler-x text-xl' />
          </IconButton>
        </ListItem>
      </List>
    </>
  )
}

export default UploadedFilePreview
