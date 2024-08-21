import { NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='w-screen py-5'>
      <div className='mx-auto w-10/12 flex justify-between items-center'>
        <p>© 2024 Meditiva. All Rights Reserved by Meditiva</p>
        <ul className='flex gap-5'>
          <li>
            <NavLink to='/terminos'>Términos </NavLink>
          </li>
          <li>
            <NavLink to='/privacidad'>Privacidad</NavLink>
          </li>
          <li>
            <NavLink to='soporte'>Soporte</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}
