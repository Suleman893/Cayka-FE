export const fetchPaginatedOptions = async (
  dispatch,
  methodToDispatch,
  queryParams,
  searchQuery,
  loadedOptions,
  { page }
) => {
  try {
    const response = await dispatch(methodToDispatch(queryParams))

    if (response.meta.requestStatus === 'fulfilled') {
      const result = {
        options: response.payload.items,
        hasMore: response.payload.pagination.isMore
      }

      //Include the `additional` property only if there are more items to load
      if (response.payload.pagination.isMore) {
        result.additional = { page: page + 1 }
      }

      return result
    } else {
      return { options: loadedOptions, hasMore: false }
    }
  } catch (err) {
    return { options: loadedOptions, hasMore: false }
  }
}
