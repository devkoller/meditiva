import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useFetch, usePost } from '@/hooks'
import { useNavigate } from 'react-router-dom'

import { AuthWrapper, Forms, FormInput, Button, Toolbar } from '@/components'

export const CrearProveedor = () => {
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

  const { response: providerData } = useFetch({
    url: '/api/catalogue/provider/' + id
  })

  const onSubmit = data => {
    const url = id ? `/api/catalogue/provider/${id}` : '/api/catalogue/provider'
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
        navigate('/proveedores')
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
    if (providerData && id) {
      reset(providerData.data)
    }
  }, [providerData])

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
        onError={onError}
        register={register}
        control={control}
      >
        <div className='flex gap-3'>
          <FormInput label='Nombre del proveedor' name='nombre' required />
          <FormInput label='RFC' name='rfc' required />
        </div>
        <div className='flex gap-3'>
          <FormInput label='Código postal' name='direccionCP' required />
          <FormInput label='Dirección' name='direccionCalle' required />
        </div>
        <div className='flex gap-3'>
          <FormInput label='Cuidad' name='direccionCiudad' required />
          <FormInput label='País' name='direccionPais' required />
        </div>
        <div className='flex gap-3'>
          <FormInput label='Razón social' name='razonSocial' required />
          <FormInput label='Regimen fiscal' name='regimenFiscal' required />
        </div>
        <FormInput
          label='Representante legal'
          name='representanteLegal'
          required
        />

        <FormInput label='Teléfono' name='telefono' />

        <div className='flex justify-end mt-3'>
          <Button type='submit' disabled={loading}>
            {id ? 'Modificar' : 'Crear'} Proveedor
          </Button>
        </div>
      </Forms>
    </AuthWrapper>
  )
}
