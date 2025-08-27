'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Data
import { consumerStats } from '@data/consumers/consumers'

//Reusable Components

import BasicStats from '@components/cards/BasicStats'
import ConsumerTable from '@components/consumers/table/ConsumerTable'

const Consumers = () => {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <Grid container spacing={5}>
          {consumerStats.map((item, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <BasicStats {...item} />
            </Grid>
          ))}
        </Grid>
        <ConsumerTable />
      </div>
    </>
  )
}

export default Consumers
