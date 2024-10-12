import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { Form } from 'react-bootstrap'

export const FormCombo = ({
  label,
  name,
  options = [],
  errorMessage,
  required,
  disabled,
  value,
  defaultValue = '',
  placeholder = 'Selecciona...',
  onchange = () => {},
  inputChange = () => {},
  menuPlacement = 'auto',
  containerClass,
  control,
  ...otherProps
}) => {
  errorMessage =
    errorMessage ||
    `El campo ${label ? label.toLowerCase() : name} es requerido`
  if (!control) {
    return (
      <>
        <span>hay un error {name}</span>
      </>
    )
  }
  return (
    <Form.Group className={`${containerClass}`}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required ? <sup style={{ color: 'red' }}>*</sup> : ''}
        </label>
      )}
      <Controller
        render={({ field }) => {
          const { value, ...rest } = field

          return (
            <Select
              classNamePrefix='react-select'
              className='react-select'
              menuPlacement={menuPlacement}
              options={options || []}
              {...rest}
              value={options.find(option => option.value === value)}
              placeholder={placeholder}
              onInputChange={inputChange}
              onChange={val => {
                if (!val) return
                field.onChange(val)
                onchange && onchange(val.value)
              }}
            />
          )
        }}
        control={control}
        name={name}
        rules={{ required: required ? errorMessage : false }}
        defaultValue={defaultValue}
        {...otherProps}
      />
    </Form.Group>
  )
}
