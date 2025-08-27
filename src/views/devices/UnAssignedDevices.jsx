'use client'

//React Imports
import { useEffect } from 'react'

//React Redux Imports
import { useDispatch, useSelector } from 'react-redux'

//Components Imports
import UploadDevices from '@views/devices/unassigned-devices/UploadDevices'
import Inventory from '@views/devices/unassigned-devices/Inventory'

//Redux Import
import { inventoryExists } from '@redux/devices/thunk'

const UnAssignedDevices = () => {
  //Redux
  const dispatch = useDispatch()

  const { isListingUpdateSuccess, isInventoryExistsLoading, isInventoryExists } = useSelector(state => state.device)

  useEffect(() => {
    dispatch(inventoryExists({ page: 1, elements: 10, sortBy: 'DESC' }))
  }, [isListingUpdateSuccess])

  return isInventoryExists ? <Inventory /> : <UploadDevices isLoading={isInventoryExistsLoading} />
}

export default UnAssignedDevices
