import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { AuthWrapper, Forms, FormInput, Button, Toolbar } from '@/components'

const options = [
  { value: 1, label: 'Producto' },
  { value: 2, label: 'Servicio' }
]

export const CrearArticulo = () => {
  const [articuloData, setArticuloData] = useState(null)
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
          <Button color='cyan' link to='/articulos' square>
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
        <FormInput label='Nombre del articulo' name='nombre' required />
        <FormInput label='Descripción' type='textarea' name='descripcion' />
        <FormInput
          label='Tipo'
          type='select'
          options={options}
          name='tipo'
          required
        />
        <FormInput label='Marca' name='marca' />
        <FormInput label='Modelo' name='modelo' />

        <div className='flex justify-end mt-3'>
          <Button type='submit'>{id ? 'Modificar' : 'Crear'} Artículo</Button>
        </div>
      </Forms>
    </AuthWrapper>
  )
}
