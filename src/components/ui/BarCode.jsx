import React from 'react'
import { useBarcode } from 'next-barcode'

export const BarCode = ({ value }) => {
  const { inputRef } = useBarcode({
    value: value
  })

  return <svg ref={inputRef} />
}
