import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { ListaPermisos } from './ListaPermisos'
import { useFetch, usePost } from '@/hooks'

import { AuthWrapper, Forms, FormInput, Button, Toolbar } from '@/components'

export const CrearUsuario = () => {
  const [usuarioData, setUsuarioData] = useState(null)
  const { execute, loading } = usePost()

  const { id } = useParams()

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: usuarioData
  })

  const onSubmit = data => {
    const url = id ? '/user/update-user' : '/user/new-user'
    const method = id ? 'patch' : 'post'

    execute({
      url,
      method,
      body: {
        ...data,
        id: id
      }
    }).then(res => {
      if (res.status === 200) {
        notifications.show({
          title: 'Correcto',
          message: `Se ha ${id ? 'actualizado' : 'creado'} correctamente`
        })
      }
    })
  }

  const { response: userData } = useFetch({
    url: '/user/find-user/' + id
  })

  const onError = errors => {
    notifications.show({
      title: 'Error!',
      message: 'Complete los campos obligatorios',
      color: 'red'
    })
  }

  useEffect(() => {
    if (userData) {
      setUsuarioData(userData.data)
      reset({
        ...userData.data,
        ...userData.data.persona
      })
    }
  }, [userData])

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
        onError={onError}
        register={register}
        control={control}
      >
        <FormInput label='Nombre' name='nombre' required />
        <div className='flex gap-3'>
          <FormInput label='Primer apellido' name='ape1' required />
          <FormInput label='Segundo apellido' name='ape2' />
        </div>
        <div>
          <FormInput label='Usuario' name='username' required disabled={id} />
          <FormInput
            label='Contraseña'
            name='password'
            required={id ? false : true}
          />
        </div>

        <div className='flex justify-end mt-3'>
          <Button type='submit' disabled={loading}>
            {id ? 'Modificar' : 'Crear'} Usuario
          </Button>
        </div>
      </Forms>

      {id && <ListaPermisos idUser={id} usuarioData={usuarioData} />}
    </AuthWrapper>
  )
}
