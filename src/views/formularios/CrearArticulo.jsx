import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useFetch, usePost } from '@/hooks'
import { useNavigate } from 'react-router-dom'

import { AuthWrapper, Forms, FormInput, Button, Toolbar } from '@/components'

const options = [
  { value: 1, label: 'Producto' },
  { value: 2, label: 'Servicio' }
]

export const CrearArticulo = () => {
  const { id } = useParams()
  const { execute, loading } = usePost()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors }
  } = useForm({})

  const { response: articleData } = useFetch({
    url: '/api/catalogue/article/' + id
  })

  const onSubmit = data => {
    const url = id ? `/api/catalogue/article/${id}` : '/api/catalogue/article'
    const method = id ? 'put' : 'post'

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

        navigate('/articulos')
      }
    })
  }

  const onError = errors => {
    notifications.show({
      title: 'Error!',
      message: 'Complete los campos obligatorios',
      color: 'red'
    })
  }

  useEffect(() => {
    if (articleData && id) {
      reset({
        ...articleData.data
      })
    }
  }, [articleData])

  return (
    <AuthWrapper>
      <Toolbar>
        <div className='flex gap-3'>
          <Button color='cyan' link to='/articulos' square>
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
        <FormInput label='Nombre del articulo' name='nombre' required />
        <FormInput label='Descripción' type='textarea' name='descrip' />
        <FormInput
          label='Tipo'
          type='select'
          options={options}
          name='tipo'
          required
        />
        <FormInput label='Marca' name='marca' />
        {/* <FormInput label='Modelo' name='modelo' /> */}

        <div className='flex justify-end mt-3'>
          <Button type='submit' disabled={loading}>
            {id ? 'Modificar' : 'Crear'} Artículo
          </Button>
        </div>
      </Forms>
    </AuthWrapper>
  )
}
