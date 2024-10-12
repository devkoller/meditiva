import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { ListaPermisos } from './ListaPermisos'

import { AuthWrapper, Forms, FormInput, Button, Toolbar } from '@/components'

export const CrearUsuario = () => {
  const [usuarioData, setUsuarioData] = useState(null)
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
          <Button color='cyan' link to='/usuarios' square>
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
        <FormInput label='Nombre' name='nombre' required />
        <div className='flex gap-3'>
          <FormInput label='Primer apellido' name='ape1' />
          <FormInput label='Segundo apellido' name='ape2' />
        </div>
        <div className='flex gap-3'>
          <FormInput label='Telefono' name='telefono' required />
          <FormInput label='Correo' name='correo' required />
        </div>
        <div>
          <FormInput label='Usuario' name='username' required />
          <FormInput label='Contraseña' name='password' required />
        </div>

        <div className='flex justify-end mt-3'>
          <Button type='submit'>{id ? 'Modificar' : 'Crear'} Usuario</Button>
        </div>
      </Forms>

      {id && <ListaPermisos idUser={id} />}
    </AuthWrapper>
  )
}
