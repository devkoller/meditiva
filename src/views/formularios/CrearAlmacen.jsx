import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useFetch, usePost } from '@/hooks'
import { useNavigate } from 'react-router-dom'

import { AuthWrapper, Forms, FormInput, Button, Toolbar } from '@/components'

const options = [
  { value: 1, label: 'Almacén' },
  { value: 2, label: 'Sub almacén' }
]

export const CrearAlmacen = () => {
  const [almacenesPadre, setAlmacenesPadre] = useState([])
  const [tipo, setTipo] = useState(null)
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

  const { response: warehouseData } = useFetch({
    url: '/api/catalogue/warehouse/' + id
  })

  const { response: warehousePadresData } = useFetch({
    url: '/api/catalogue/warehouse',
    qs: {
      tipo: 1
    }
  })

  const onSubmit = data => {
    const url = id
      ? `/api/catalogue/warehouse/${id}`
      : '/api/catalogue/warehouse'
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
        navigate('/almacenes')
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
    if (warehouseData && id) {
      reset(warehouseData.data)
      setTipo(warehouseData.data.tipo)
    }
  }, [warehouseData])

  useEffect(() => {
    if (warehousePadresData) {
      const padres = warehousePadresData.data.map(almacen => {
        return {
          value: almacen.id,
          label: almacen.nombre
        }
      })
      setAlmacenesPadre(padres)
    }
  }, [warehousePadresData])

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
        onError={onError}
        control={control}
      >
        <FormInput label='Nombre del almacén' name='nombre' required />
        <FormInput label='Descripción' type='textarea' name='descrip' />

        <FormInput
          label='Tipo'
          type='select'
          options={options}
          name='tipo'
          onchange={e => {
            setTipo(e)
          }}
          required
        />

        {tipo === 2 && almacenesPadre.length > 0 && (
          <FormInput
            label='Selecciona el almacén padre'
            type='select'
            options={almacenesPadre || []}
            name='padre'
            required
          />
        )}

        <div className='flex justify-end mt-3'>
          <Button type='submit' disabled={loading}>
            {id ? 'Modificar' : 'Crear'} Almacén
          </Button>
        </div>
      </Forms>
    </AuthWrapper>
  )
}
