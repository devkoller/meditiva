import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5'

export const TextFilter = ({ title, setQuery, accessor, query }) => {
  return (
    <div className='p-3 border border-gray-400 rounded-md bg-white'>
      <h3 className='font-bold'>{title}</h3>
      <p>
        Filtra por el campo <span className='font-bold'>{title}</span>
      </p>
      <div className='flex gap-2 items-center  rounded-sm px-2 mt-3 relative'>
        <label className='absolute left-5'>
          <IoSearchOutline />
        </label>
        <input
          className='border border-gray-400 w-full rounded-md py-1 pr-8  pl-8'
          type='text'
          value={query[accessor] || ''}
          onChange={e =>
            setQuery(state => {
              return { ...state, [accessor]: e.target.value }
            })
          }
        />
        <span className='absolute right-5'>
          <IoCloseOutline
            className='cursor-pointer'
            onClick={() =>
              setQuery(state => {
                return { ...state, [accessor]: '' }
              })
            }
          />
        </span>
      </div>
    </div>
  )
}
