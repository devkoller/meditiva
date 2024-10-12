import { useState } from 'react'

export const useSessionStorage = ({ key, defaultValue }) => {
  const [StoredValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key)

      if (item) {
        return JSON.parse(item)
      } else {
        sessionStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (error) {
      return defaultValue
    }
  })

  const setValue = newValue => {
    try {
      sessionStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.log(error)
    }
    setStoredValue(newValue)
  }

  return [StoredValue, setValue]
}
