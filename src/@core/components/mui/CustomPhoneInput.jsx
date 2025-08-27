//React Imports
import { useState, useMemo } from 'react'

//MUI Imports
import { Menu, InputBase, List, ListItem, ListItemIcon, ListItemText, InputAdornment } from '@mui/material'

//Third Party Imports
import CountryFlag from 'react-country-flag'

//Reusable Component Imports
import CustomTextField from '@core/components/mui/TextField'

//Static Data Imports
import countries from '@data/common/countries'

const CustomPhoneInput = ({
  value,
  onChange,
  error,
  helperText,
  label,
  placeholder,
  setSelectedCountryCode,
  selectedCountry,
  setSelectedCountry
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleCountryClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCountryClose = () => {
    setAnchorEl(null)
    setSearchQuery('')
  }

  const handleCountrySelect = country => {
    setSelectedCountryCode(country?.dialCode)
    setSelectedCountry({ ...country })
    handleCountryClose()
  }

  const handleSearchChange = event => {
    setSearchQuery(event.target.value)
  }

  const lowerQuery = searchQuery.trim().toLowerCase()

  const filteredCountries = useMemo(() => {
    if (!lowerQuery) return countries

    return countries.filter(
      ({ name, dialCode }) => name.toLowerCase().includes(lowerQuery) || dialCode.includes(lowerQuery)
    )
  }, [searchQuery, countries])

  const isMenuOpen = Boolean(anchorEl)

  return (
    <>
      <CustomTextField
        fullWidth
        variant='outlined'
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        error={error}
        helperText={helperText}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
              onClick={handleCountryClick}
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <CountryFlag
                countryCode={selectedCountry?.code || 'US'}
                svg
                style={{ width: '24px', height: '16px', marginRight: '8px' }}
              />
              <span>{selectedCountry?.dialCode || '+1'}</span>
              {/* <i
                className={isMenuOpen ? 'tabler-arrow-up' : 'tabler-arrow-down'}
                style={{ marginLeft: '8px', color: '#6C757D' }} // Gray color for the icons
              /> */}
            </InputAdornment>
          )
        }}
        placeholder={placeholder}
      />
      <Menu
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={handleCountryClose}
        sx={{
          mt: '7px'
        }}
      >
        <InputBase
          fullWidth
          placeholder='Search country by name or code...'
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ paddingLeft: '10px' }}
          startAdornment={
            <InputAdornment position='start'>
              <i className='tabler-search' />
            </InputAdornment>
          }
        />
        <List sx={{ maxHeight: '200px' }}>
          {filteredCountries.map(country => {
            return (
              <ListItem
                key={country.code}
                onClick={() => handleCountrySelect(country)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <ListItemIcon>
                  <CountryFlag countryCode={country.code || 'US'} svg style={{ width: '24px', height: '16px' }} />
                </ListItemIcon>
                <ListItemText primary={`${country?.name} (${country?.dialCode})`} />
              </ListItem>
            )
          })}
        </List>
      </Menu>
    </>
  )
}

export default CustomPhoneInput
