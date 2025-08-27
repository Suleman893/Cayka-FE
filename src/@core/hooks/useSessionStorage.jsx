import { useState, useEffect } from 'react'

const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error accessing sessionStorage', error)

      return initialValue
    }
  })

  // Function to set value in sessionStorage
  const setValue = value => {
    try {
      setStoredValue(value)

      if (value === undefined || value === null) {
        window.sessionStorage.removeItem(key)
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error('Error setting sessionStorage', error)
    }
  }

  // Function to remove item from sessionStorage
  const removeItem = () => {
    try {
      window.sessionStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error('Error removing from sessionStorage', error)
    }
  }

  // Sync changes in sessionStorage with state
  useEffect(() => {
    const handleStorageChange = () => {
      const item = window.sessionStorage.getItem(key)

      setStoredValue(item ? JSON.parse(item) : initialValue)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return [storedValue, setValue, removeItem]
}

export default useSessionStorage
