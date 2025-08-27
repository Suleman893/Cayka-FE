//React Imports
import { useCallback } from 'react'

//MUI Imports
import Grid from '@mui/material/Grid2'

//Third Party Imports
import { Controller, useWatch } from 'react-hook-form'
import { useDispatch } from 'react-redux'

//Components Imports
import CustomAsyncPaginate from '@components/commons/AsyncPaginate'

//Redux Imports
import { allBrands, allPurchaseOrders } from '@redux/brands/thunk'
import { allUnassignedDevices } from '@redux/devices/thunk'

//Helpers Imports
import { deviceNameFormatter } from '@helpers/enumFormat'
import { fetchPaginatedOptions } from '@helpers/fetchPaginatedOptions'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const DeviceAssignment = ({ control, errors, setValue }) => {
  //Redux Import
  const dispatch = useDispatch()

  const selectedBrand = useWatch({ control, name: 'brand' })
  const selectedPurchaseOrder = useWatch({ control, name: 'brandPurchaseOrder' })

  // const loadOptionsForPO = useCallback(
  //   async (searchQuery, loadedOptions, { page }) => {
  //     const response = await dispatch(allPurchaseOrders({ id: selectedBrand?.id, page, elements, sortBy }))

  //     if (response.meta.requestStatus === 'fulfilled') {
  //       const result = {
  //         options: response.payload.items,
  //         hasMore: response.payload.pagination.isMore
  //       }

  //       // Include the `additional` property only if there are more items to load
  //       if (response.payload.pagination.isMore) {
  //         result.additional = { page: page + 1 }
  //       }

  //       return result
  //     } else {
  //       return { options: loadedOptions, hasMore: false }
  //     }
  //   },
  //   [selectedBrand?.id]
  // )

  const loadBrandOptions = async (searchQuery, loadedOptions, additional) => {
    const page = additional.page || 1

    return fetchPaginatedOptions(
      dispatch,
      allBrands,
      {
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY
      },
      searchQuery,
      loadedOptions,
      additional
    )
  }

  const loadPOOptions = useCallback(
    async (searchQuery, loadedOptions, additional) => {
      const page = additional.page || 1

      return fetchPaginatedOptions(
        dispatch,
        allPurchaseOrders,
        {
          id: selectedBrand?.id,
          page,
          elements: PAGE_SIZE,
          sortBy: SORT_BY
        },
        searchQuery,
        loadedOptions,
        additional
      )
    },
    [selectedBrand?.id]
  )

  const loadUnassignedOptions = async (searchQuery, loadedOptions, additional) => {
    const page = additional.page || 1

    return fetchPaginatedOptions(
      dispatch,
      allUnassignedDevices,
      {
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY
      },
      searchQuery,
      loadedOptions,
      additional
    )
  }

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Controller
          name='brand'
          control={control}
          render={({ field }) => (
            <CustomAsyncPaginate
              {...field}
              placeholder='Select Brand'
              onChange={selectedBrand => {
                field.onChange(selectedBrand)
                setValue('brandPurchaseOrder', null) // Reset P.O. on brand change
              }}
              loadOptions={loadBrandOptions}
              getOptionValue={option => option.id}
              getOptionLabel={option => option.name}
              additional={{ page: 1 }}
              label='Select Brand'
              isSearchable
              error={errors && errors.brand}
              menuPortal={false} //menuPortal false in Modals
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Controller
          name='brandPurchaseOrder'
          control={control}
          render={({ field }) => (
            <CustomAsyncPaginate
              {...field}
              label='Select P.O (Purchase Order)'
              key={selectedBrand?.id}
              onChange={selectedPO => {
                field.onChange(selectedPO)
                setValue('invoiceId', selectedPO?.invoiceId || '')
              }}
              loadOptions={loadPOOptions}
              getOptionValue={option => option.id}
              getOptionLabel={option => option.poNumber}
              additional={{ page: 1 }}
              isSearchable
              placeholder='Select Purchase Order'
              isDisabled={!selectedBrand?.id}
              error={errors?.brandPurchaseOrder || null}
              menuPortal={false} //menuPortal false in Modals
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Controller
          name='devices'
          control={control}
          render={({ field }) => (
            <CustomAsyncPaginate
              label='Select Unassigned Module'
              value={field.value || []}
              onChange={selectedOptions => {
                field.onChange(selectedOptions)
              }}
              loadOptions={loadUnassignedOptions}
              getOptionValue={option => option.id}
              getOptionLabel={option => `${deviceNameFormatter(option?.deviceType?.name)} - ${option?.deviceId}`}
              additional={{ page: 1 }}
              isMulti
              placeholder='Select Unassigned Module'
              isDisabled={!selectedBrand?.id || !selectedPurchaseOrder?.id}
              error={errors?.devices}
              menuPortal={false} //menuPortal false in Modals
            />
          )}
        />
      </Grid>
    </>
  )
}

export default DeviceAssignment
