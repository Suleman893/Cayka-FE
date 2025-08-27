'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import Button from '@mui/material/Button'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const ActivityLogs = ({ title, data, isBtn = false, btnTitle }) => {
  return (
    <Card sx={{ my: '5px' }}>
      <CardContent>
        <div className='flex justify-between items-center pb-6'>
          <Typography variant='h5'>{title}</Typography>
          {isBtn && <Button variant='contained'>{btnTitle}</Button>}
        </div>
        <Timeline>
          {data.length &&
            data.map((itm, idx) => (
              <TimelineItem key={idx}>
                <TimelineSeparator>
                  <TimelineDot color='info' />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                    <Typography color='text.primary'>{itm.title}</Typography>
                    <Typography variant='caption' color='text.disabled'>
                      {itm.date}
                    </Typography>
                  </div>
                  <Typography className='mbe-2'>{itm.description}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ActivityLogs
