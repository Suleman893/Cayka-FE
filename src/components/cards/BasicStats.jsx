'use client'

//MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'

//Third-party Imports
import classnames from 'classnames'

const BasicStats = props => {
  const gradientBackground = 'linear-gradient(to right, rgba(25, 158, 199, 1), rgba(10, 80, 102, 1))'

  //Props
  const {
    value,
    title,
    stats,
    activeAvatarIcon,
    avatarIcon,
    avatarColor,
    currentStats,
    setCurrentStats,
    isClickable = false
  } = props

  const isActive = isClickable && currentStats === value

  return (
    <Card
      sx={{
        background: isActive ? gradientBackground : 'rgba(255, 255, 255, 1)',
        cursor: isClickable ? 'pointer' : 'default'
      }}
    >
      <CardContent
        className='flex flex-col justify-between gap-5'
        onClick={() => {
          isClickable && setCurrentStats(value)
        }}
      >
        <div className='flex justify-between items-center gap-4 flex-grow'>
          <Avatar
            sx={{
              bgcolor: isActive ? 'rgba(20, 160, 204, 1)' : avatarColor
            }}
            variant='rounded'
            size={42}
          >
            {isActive ? activeAvatarIcon : avatarIcon}
          </Avatar>
          <p
            className={classnames('text-2xl', {
              'text-black': !isActive,
              'text-white': isActive
            })}
          >
            {stats}
          </p>
        </div>
        <p
          className={classnames('text-sm', {
            'text-black': !isActive,
            'text-white': isActive
          })}
        >
          {title}
        </p>
      </CardContent>
    </Card>
  )
}

export default BasicStats
