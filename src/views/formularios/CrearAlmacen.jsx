import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { AuthWrapper, Forms, FormInput, Button, Toolbar } from '@/components'

const options = [
  { value: 1, label: 'Almacén' },
  { value: 2, label: 'Sub almacén' }
]

export const CrearAlmacen = () => {
  const [almacenData, setAlmacenData] = useState(null)
  const { id } = useParams()
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm({})

  const onSubmit = data => {
    notifications.show({
      title: 'Correcto',
      message: 'Se ha creado correctamente'
    })
  }

  const onError = errors => {
    notifications.show({
      title: 'Correcto',
      message: 'Se ha creado correctamente',
      color: 'red'
    })
  }
  return (
    <AuthWrapper>
      <Toolbar>
        <div className='flex gap-3'>
          <Button color='cyan' link to='/almacenes' square>
            <IoMdArrowRoundBack />
          </Button>
        </div>
      </Toolbar>
      <Forms
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        control={control}
      >
        <FormInput label='Nombre del almacen' name='nombre' required />
        <FormInput label='Descripción' type='textarea' name='descripcion' />
        <FormInput
          label='Tipo'
          type='select'
          options={options}
          name='tipo'
          required
        />
        <FormInput label='Almacén padre' type='select' name='marca' />

        <div className='flex justify-end mt-3'>
          <Button type='submit'>{id ? 'Modificar' : 'Crear'} Almacén</Button>
        </div>
      </Forms>
    </AuthWrapper>
  )
}
