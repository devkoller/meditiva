import { useRef, useMemo } from 'react'
import Select from 'react-select'
import { IoCheckmark } from 'react-icons/io5'

export const SelectFilter = ({
  title,
  accessor,
  selected,
  setSelected,
  data
}) => {
  let ref = useRef()
  const list = useMemo(() => {
    const options = new Set(data.map(e => e[accessor]))
    let set = []
    for (const element of options) {
      set.push({ value: element, label: element })
    }
    return set
  }, [])

  return (
    <div className='p-3 border border-gray-400 rounded-md bg-white'>
      <div className=''>
        <label htmlFor={accessor} className='text-sm font-medium text-gray-700'>
          {title}
        </label>
        <Select
          ref={ref}
          options={list}
          defaultValue={
            selected[accessor]
              ? list.filter(e => selected[accessor].includes(e.value))
              : []
          }
          isMulti
          className='py-1 w-full min-w-60'
          onChange={Opt => {
            let data = []
            for (const element of Opt) {
              data.push(element.value)
            }
            setSelected(state => {
              return { ...state, [accessor]: data }
            })
          }}
        />
      </div>

      <div>
        <p>
          Filtra por el campo <span className='font-bold'>{title}</span>
        </p>
        <ul>
          {list.map((e, i) => {
            const isSelected = selected[accessor] || []

            return (
              <li
                key={i}
                onClick={() => {
                  let data = []
                  if (isSelected.includes(e.value)) {
                    data = isSelected.filter(i => i !== e.value)
                  } else {
                    data = [...isSelected, e.value]
                  }
                  const newArray = []

                  for (const element of data) {
                    newArray.push({ value: element, label: element })
                  }
                  ref.current.setValue(newArray)
                }}
                className='cursor-pointer flex gap-1 items-center  hover:bg-gray-100'
              >
                {isSelected && isSelected.includes(e.value) && <IoCheckmark />}
                {e.label}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
