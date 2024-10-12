import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { AuthWrapper, Forms, FormInput, Button, Toolbar } from '@/components'

export const CrearProveedor = () => {
  const [proveedorData, setProveedorData] = useState(null)
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
          <Button color='cyan' link to='/proveedores' square>
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
        <FormInput label='Nombre del proveedor' name='nombre' required />
        <FormInput label='Descripción' type='textarea' name='descripcion' />

        <div className='flex justify-end mt-3'>
          <Button type='submit'>{id ? 'Modificar' : 'Crear'} Proveedor</Button>
        </div>
      </Forms>
    </AuthWrapper>
  )
}
