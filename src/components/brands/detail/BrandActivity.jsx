'use client'

// React Imports
import { useState, useEffect } from 'react'

//MUI Imports
import Grid from '@mui/material/Grid2'

import { useSelector } from 'react-redux'

//Data Import
import { linearProgressData } from '@data/brands/brands'

//Component Imports
import BasicDialog from '@core/components/mui/BasicDialog'
import ChangeStatus from '@components/brands/detail/dialogs/ChangeStatus'
import StatusChange from '@components/cards/StatusChange'
import DevicesProgress from '@components/brands/detail/DeviceProgress'
import POTable from '@components/brands/detail/table/POTable'

// import UploadFile from '@components/commons/dialogs/UploadFile'

const BrandActivity = () => {
  const { brandDetail } = useSelector(state => state.brand)

  //States
  //Switch
  const [isChecked, setIsChecked] = useState(false)

  //Modal
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false)

  useEffect(() => {
    setIsChecked(brandDetail?.status === 'active' ? true : false)
  }, [brandDetail?.status])

  return (
    <>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <StatusChange
            title='Change Brand Status'
            switchTitle='Activate/Inactive'
            defaultChecked={brandDetail?.status === 'active' ? true : false}
            checked={isChecked}
            handleChange={() => {
              setIsChecked(!isChecked)
              setOpenChangeStatusModal(!openChangeStatusModal)
            }}
            disabled={brandDetail?.status === 'pending'}
            tooltipProps={{
              title: `Brand admin's has not signed up yet`,
              condition: brandDetail?.status === 'pending'
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <DevicesProgress data={linearProgressData} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <POTable />
        </Grid>
      </Grid>
      {/* <BasicDialog
        fullWidth={true}
        content={<UploadFile />}
        title='Upload New Purchase Order'
        subTitle=''
        open={openUploadPOModal}
        setOpen={setOpenUploadPOModal}
      /> */}
      <BasicDialog
        fullWidth={false}
        title='Confirmation!'
        subTitle=''
        content={<ChangeStatus data={brandDetail} setIsChecked={setIsChecked} setOpen={setOpenChangeStatusModal} />}
        open={openChangeStatusModal}
        setOpen={setOpenChangeStatusModal}
      />
    </>
  )
}

export default BrandActivity
