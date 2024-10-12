import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { AuthWrapper, Forms, FormInput, Button, Toolbar } from '@/components'

export const CrearEmpresa = () => {
  const [empresaData, setEmpresaData] = useState(null)
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
          <Button color='cyan' link to='/empresas' square>
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
        <FormInput label='Nombre de la empresa' name='nombre' required />
        <FormInput label='RFC' name='rfc' />
        <FormInput label='Correo' name='correo' />
        <FormInput label='Teléfono' name='telefono' />
        <FormInput label='Representante legal' name='rep_legal' />

        <div className='flex justify-end mt-3'>
          <Button type='submit'>{id ? 'Modificar' : 'Crear'} Empresa</Button>
        </div>
      </Forms>
    </AuthWrapper>
  )
}
