import Slc from 'react-select'

export const Select = ({ label, options, onChange }) => {
  return (
    <div className='w-full'>
      <label>{label}</label>
      <Slc
        options={options}
        onChange={onChange}
        placeholder='Selecciona una opción'
      />
    </div>
  )
}
