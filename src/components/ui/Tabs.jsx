import { NavLink } from 'react-router-dom'

export const Tabs = ({ items = [] }) => {
  const print = () => {
    return items.map((item, index) => {
      return (
        <NavLink
          key={index}
          to={item.to}
          className='text-gray-400 font-bold text-xl duration-500 hover:text-sky-800 after:content-[""] after:block after:w-0 after:h-1 after:bg-sky-800 after:mt-1 after:duration-500 hover:after:w-full [&.active]:text-sky-500 [&.active]:after:w-full [&.active]:after:bg-sky-500 mb-5'
          end
        >
          {item.label}
        </NavLink>
      )
    })
  }
  return <div className='w-full flex gap-3'>{print()}</div>
}
