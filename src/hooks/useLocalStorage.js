import { useState } from 'react'

export const useLocalStorage = ({ key, defaultValue }) => {
  const [StoredValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)

      if (item) {
        return JSON.parse(item)
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (error) {
      return defaultValue
    }
  })

  const setValue = newValue => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.log(error)
    }
    setStoredValue(newValue)
  }

  return [StoredValue, setValue]
}
