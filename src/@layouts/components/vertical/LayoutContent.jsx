'use client'

//React Imports

import { useEffect } from 'react'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useDispatch } from 'react-redux'

import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

// Styled Component Imports
import StyledMain from '@layouts/styles/shared/StyledMain'

//Redux Imports
import { loggedInUser } from '@redux/user/thunk'

const LayoutContent = ({ children }) => {
  // Hooks
  const dispatch = useDispatch()
  const { settings } = useSettings()

  // Vars
  const contentCompact = settings.contentWidth === 'compact'
  const contentWide = settings.contentWidth === 'wide'

  useEffect(() => {
    dispatch(loggedInUser())
  }, [])

  return (
    <StyledMain
      isContentCompact={contentCompact}
      className={classnames(verticalLayoutClasses.content, 'flex-auto', {
        [`${verticalLayoutClasses.contentCompact} is-full`]: contentCompact,
        [verticalLayoutClasses.contentWide]: contentWide
      })}
    >
      {children}
    </StyledMain>
  )
}

export default LayoutContent
